import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterContactComponent } from './enter-contact.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { TestHelper } from 'src/app/test/test-helper';
import { ContactGenerator } from 'src/app/test/contact.generator';

describe('EnterContactComponent', () => {
  let component: EnterContactComponent;
  let hostComponent: EnterContactHostComponent;
  let fixture: ComponentFixture<EnterContactHostComponent>;
  let firstNameInput: HTMLInputElement;
  let lastNameInput: HTMLInputElement;
  let saveButtonElement: DebugElement;
  let saveButtonHtmlElement: HTMLButtonElement;
  let debugElement: DebugElement;

  @Component({
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
      declarations: [EnterContactComponent, EnterContactHostComponent],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
  }));

  function createComponent(): void {
    fixture = TestBed.createComponent(EnterContactHostComponent);
    hostComponent = fixture.componentInstance;
    component = fixture.debugElement.children[0].componentInstance;
  }

  function setInputs(firstName: string, lastName: string) {
    TestHelper.setInputText(firstNameInput, firstName);
    TestHelper.setInputText(lastNameInput, lastName);
    fixture.detectChanges();
  }

  function assignHtmlElements(): void {
    debugElement = fixture.debugElement;
    firstNameInput = TestHelper.getInputElement(fixture, '#firstNameInput');
    lastNameInput = TestHelper.getInputElement(fixture, '#lastNameInput');
    saveButtonElement = debugElement.query(By.css('#saveButton'));
    saveButtonHtmlElement = saveButtonElement.nativeElement;
  }

  describe('create mode cleaned up', () => {
    beforeEach(() => {
      createComponent();
      fixture.detectChanges();
      assignHtmlElements();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
      // any default expects we can also put here
      const deleteButton = debugElement.query(By.css('#deleteButton'));
      expect(deleteButton === null).toBe(true, 'Delete button should only show for edit mode');
    });

    it('should not allow save if form invalid', () => {
      const buttonSaveInitialDisabled = saveButtonElement.properties.disabled;

      setInputs('first', 'last');

      const buttonSaveDisabledWithBothSet = saveButtonElement.properties.disabled;

      expect(buttonSaveInitialDisabled).toBe(true);
      expect(buttonSaveDisabledWithBothSet).toBe(false);
    });

    it('should require required fields', () => {
      setInputs('first', '');
      expect(saveButtonElement.properties.disabled).toBe(true, 'last name should be required');
      setInputs('', 'last');
      expect(saveButtonElement.properties.disabled).toBe(true, 'first name should be required');
      setInputs('first', 'last');
      expect(saveButtonElement.properties.disabled).toBe(false);
    });

    it('should send contact on save click', () => {
      setInputs('first', 'last');

      saveButtonHtmlElement.click();

      // check that saveContact is an instance of an object
      const savedContact = hostComponent.savedContact;
      expect(savedContact).toBeTruthy();
      // check that the contact's properties were assigned as expected
      expect(savedContact.firstName).toBe('first');
      expect(savedContact.lastName).toBe('last');
    });
  });

  describe('edit mode', () => {
    let editContact: Contact;
    beforeEach(() => {
      createComponent();
      assignEdit();
      assignHtmlElements();
    });

    function assignEdit(): void {
      editContact = ContactGenerator.getDefaultContact();
      hostComponent.startingContact = editContact;
      fixture.detectChanges(); // calls ngOnInit
    }

    it('should display the populated contact', () => {
      expect(firstNameInput.value).toBe(editContact.firstName);
      expect(lastNameInput.value).toBe(editContact.lastName);
    });

    it('should display delete and handle click', () => {
      const deleteSpy = spyOn(hostComponent, 'onDelete');
      const deleteButton = debugElement.query(By.css('#deleteButton'));
      expect(deleteButton).toBeTruthy('Delete button should show for edit mode');

      deleteButton.nativeElement.click();
      expect(deleteSpy).toHaveBeenCalled();
    });
  });
});
