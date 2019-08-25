import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ActivatedRouteStub } from 'src/app/fakes/activated-route-stub';
import { FakeEnterContactComponent } from 'src/app/fakes/fake-enter-contact-component';
import { Contact } from 'src/app/models/contact.model';

import { ContactService } from '../../../../services/contact.service';
import { EnterContactComponent } from '../enter-contact/enter-contact.component';
import { AddContactComponent } from './add-contact.component';

describe('AddContactComponent', () => {
  let component: AddContactComponent;
  let fixture: ComponentFixture<AddContactComponent>;
  let mockRouter: Router;
  let activatedRoute: ActivatedRouteStub;
  let enterContactComponent: EnterContactComponent;
  let mockContactService: ContactService;

  beforeEach(async(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    activatedRoute = new ActivatedRouteStub();
    mockContactService = jasmine.createSpyObj<ContactService>('contact service', ['insertContact']);

    TestBed.configureTestingModule({

      declarations: [
        AddContactComponent,
        // from a unit test perspective we only want to handle
        // the contract of EnterContactComponent
        // we will use a fake so that the real one can't break these tests
        FakeEnterContactComponent,
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
    fixture = TestBed.createComponent(AddContactComponent);
    component = fixture.componentInstance;
    enterContactComponent = fixture.debugElement.children[0].children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save on save event', () => {
    // grab the contact service and give it a value to return
    const service = fixture.debugElement.injector.get(ContactService);
    (service.insertContact as jasmine.Spy).and.returnValue(of(new Contact()));

    enterContactComponent.save.emit(new Contact());

    expect(mockContactService.insertContact).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalled();
  });

  it('should route on cancel event', () => {
    // call cancel event from enter contact component
    enterContactComponent.cancel.emit();

    // make sure we routed away
    expect(mockRouter.navigate).toHaveBeenCalled();
  });
});
