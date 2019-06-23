import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { ActivatedRouteStub } from 'src/app/mocks/activated-route-stub';
import { MockEnterContactComponent } from 'src/app/mocks/mock-enter-contact-component';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

import { EditContactComponent } from './edit-contact.component';

describe('EditContactComponent', () => {
  let component: EditContactComponent;
  let fixture: ComponentFixture<EditContactComponent>;
  let mockRouter: Router;
  let activatedRoute: ActivatedRouteStub;
  let mockContactService: ContactService;

  beforeEach(async(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    activatedRoute = new ActivatedRouteStub();
    mockContactService = jasmine.createSpyObj<ContactService>('contact service', ['getContactById', 'updateContact', 'deleteContact']);
    const contactSubject = new Subject<Contact>();
    (mockContactService.getContactById as jasmine.Spy).and.returnValue(contactSubject);
    (mockContactService.updateContact as jasmine.Spy).and.returnValue(of(true));
    (mockContactService.deleteContact as jasmine.Spy).and.returnValue(of(true));

    activatedRoute.setParamMap({ id: 1 });

    TestBed.configureTestingModule({
      declarations: [
        EditContactComponent,
        MockEnterContactComponent,
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: ContactService, useValue: mockContactService },
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
    const enterComponent = afterEnterContact.componentInstance as MockEnterContactComponent;
    expect(hasEnterContactAtStart == null).toBe(true);
    expect(afterEnterContact).toBeTruthy();
    // verify we pass in the contact to enter contact component
    expect(enterComponent.contact).toBe(newContact);
  });

  describe('handles events', () => {
    let enterContactComponent: MockEnterContactComponent;

    beforeEach(() => {
      (component.loadedContact as Subject<Contact>).next(new Contact());
      fixture.detectChanges();
      enterContactComponent = fixture.debugElement.query(By.css('#editContact')).componentInstance as MockEnterContactComponent;

    });

    it('listens to cancel', () => {
      enterContactComponent.cancel.emit();
      expect(mockRouter.navigate).toHaveBeenCalled();
    });

    it('listens to save', () => {
      enterContactComponent.save.emit(new Contact());
      expect(mockRouter.navigate).toHaveBeenCalled();
    });

    it('listens to delete', () => {
      enterContactComponent.delete.emit();
      expect(mockRouter.navigate).toHaveBeenCalled();
    });
  });
});
