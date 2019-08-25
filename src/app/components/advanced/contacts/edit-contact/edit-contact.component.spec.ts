import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { ActivatedRouteStub } from 'src/app/fakes/activated-route-stub';
import { FakeEnterContactComponent } from 'src/app/fakes/fake-enter-contact-component';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

import { EditContactComponent } from './edit-contact.component';

describe('EditContactComponent', () => {
  let component: EditContactComponent;
  let fixture: ComponentFixture<EditContactComponent>;
  let mockRouter: Router;
  let activatedRoute: ActivatedRouteStub;
  let fakeContactService: ContactService;
  const contactIdFromRoute = 12345;

  beforeEach(async(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    activatedRoute = new ActivatedRouteStub();
    fakeContactService = jasmine.createSpyObj<ContactService>('contact service', ['getContactById', 'updateContact', 'deleteContact']);
    const contactSubject = new Subject<Contact>();
    (fakeContactService.getContactById as jasmine.Spy).and.returnValue(contactSubject);
    (fakeContactService.updateContact as jasmine.Spy).and.returnValue(of(true));
    (fakeContactService.deleteContact as jasmine.Spy).and.returnValue(of(true));

    activatedRoute.setParamMap({ id: contactIdFromRoute });

    TestBed.configureTestingModule({
      declarations: [
        EditContactComponent,
        FakeEnterContactComponent,
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: ContactService, useValue: fakeContactService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show until loaded', () => {
    const hasEnterContactAtStart = fixture.debugElement.query(By.css('#editContact'));
    const contactSubject = component.loadedContact as Subject<Contact>;
    const newContact = new Contact();
    // manually adding the observable from the service
    contactSubject.next(newContact);
    fixture.detectChanges();

    const afterEnterContact = fixture.debugElement.query(By.css('#editContact'));
    const enterComponent = afterEnterContact.componentInstance as FakeEnterContactComponent;
    expect(hasEnterContactAtStart).not.toBeTruthy();
    expect(afterEnterContact).toBeTruthy();
    // verify we pass in the contact to enter contact component
    expect(enterComponent.contact).toBe(newContact);
  });

  describe('handles events', () => {
    let enterContactComponent: FakeEnterContactComponent;

    beforeEach(() => {
      (component.loadedContact as Subject<Contact>).next(new Contact());
      fixture.detectChanges();
      enterContactComponent = fixture.debugElement.query(By.css('#editContact')).componentInstance as FakeEnterContactComponent;
    });

    it('listens to cancel', () => {
      enterContactComponent.cancel.emit();
      expect(mockRouter.navigate).toHaveBeenCalled();
    });

    it('listens to save', () => {
      const updatedContact = new Contact();
      enterContactComponent.save.emit(updatedContact);

      expect(updatedContact.id).toBe(contactIdFromRoute);
      expect(fakeContactService.updateContact).toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalled();
    });

    it('listens to delete', () => {
      enterContactComponent.delete.emit();
      expect(fakeContactService.deleteContact).toHaveBeenCalledWith(contactIdFromRoute);
      expect(mockRouter.navigate).toHaveBeenCalled();
    });
  });
});
