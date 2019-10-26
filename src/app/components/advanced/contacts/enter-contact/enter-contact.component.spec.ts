import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterContactComponent } from './enter-contact.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';

describe('EnterContactComponent', () => {
  let component: EnterContactComponent;
  let hostComponent: EnterContactHostComponent;
  let fixture: ComponentFixture<EnterContactHostComponent>;

  // since we have Inputs and Outputs we'll test it with a host component
  // https://angular.io/guide/testing#component-inside-a-test-host
  // since we only ever use it here it will stay in this file
  @Component({
    // here we will have it display the component we're testing
    // we will also hook into the same inputs and outputs
    template: `<app-enter-contact [contact]="startingContact" (save)="onSave($event)" (cancel)="onCancel()" (delete)="onDelete()">
    </app-enter-contact>`,
  })
  class EnterContactHostComponent {
    savedContact: Contact;
    startingContact: Contact;

    onSave(contact: Contact): void {
      this.savedContact = contact;
    }

    onCancel(): void { }
    onDelete(): void { }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // declare both components
      declarations: [EnterContactComponent, EnterContactHostComponent],
      // needed to handle our forms
      imports: [FormsModule, ReactiveFormsModule],
    })
      .compileComponents();
  }));

  // this is now a function to allow us to change what happens
  // specifically before the ngOnInit that occurs at the first
  // detectChanges call
  function createComponent(): void {
    // since we're using a host component, we create it
    fixture = TestBed.createComponent(EnterContactHostComponent);
    hostComponent = fixture.componentInstance;
    // to assign our component
    // we grab the first child element's component instance
    component = fixture.debugElement.children[0].componentInstance;
  }

  describe('create mode', () => {
    beforeEach(() => {
      createComponent();
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
      // any default expects we can also put here
      const deleteButton = fixture.debugElement.query(By.css('#deleteButton'));
      expect(deleteButton === null).toBe(true, 'Delete button only shows for edit mode');
    });

    it('should not allow save if form invalid', () => {
      // notice we're grabbing the nativeElement directly, casting as HtmlInputElement
      // it is better to interact with the html as a user would
      // than directly assign values on contactForm
      const firstNameInput: HTMLInputElement = fixture.debugElement.query(By.css('#firstNameInput')).nativeElement;
      const lastNameInput: HTMLInputElement = fixture.debugElement.query(By.css('#lastNameInput')).nativeElement;
      // here we're getting the DebugElement so that we can query info from it
      const saveButton = fixture.debugElement.query(By.css('#saveButton'));

      const buttonSaveInitialDisabled = saveButton.properties.disabled;

      // set both required fields to have a value
      firstNameInput.value = 'first';
      firstNameInput.dispatchEvent(new Event('input'));
      lastNameInput.value = 'last';
      lastNameInput.dispatchEvent(new Event('input'));

      // since we're looking at html properties we have to refresh html
      fixture.detectChanges();

      const buttonSaveDisabledWithBothSet = saveButton.properties.disabled;

      expect(buttonSaveInitialDisabled).toBe(true);
      expect(buttonSaveDisabledWithBothSet).toBe(false);
    });

    it('should send contact on save click', () => {
      const firstNameInput: HTMLInputElement = fixture.debugElement.query(By.css('#firstNameInput')).nativeElement;
      const lastNameInput: HTMLInputElement = fixture.debugElement.query(By.css('#lastNameInput')).nativeElement;
      const saveButtonHtmlElement: HTMLElement = fixture.debugElement.query(By.css('#saveButton')).nativeElement;

      firstNameInput.value = 'first';
      firstNameInput.dispatchEvent(new Event('input'));
      lastNameInput.value = 'last';
      lastNameInput.dispatchEvent(new Event('input'));

      // allow the button to update to not be disabled
      fixture.detectChanges();

      saveButtonHtmlElement.click();

      // check that saveContact is an instance of an object
      const savedContact = hostComponent.savedContact;
      expect(savedContact).toBeTruthy();
      // check that the contact's properties were assigned as expected
      expect(savedContact.firstName).toBe('first');
      expect(savedContact.lastName).toBe('last');
    });
  });
});
