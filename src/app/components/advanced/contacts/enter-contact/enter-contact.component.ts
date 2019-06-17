import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact.model';


@Component({
  selector: 'app-enter-contact',
  templateUrl: './enter-contact.component.html',
  styleUrls: ['./enter-contact.component.css']
})
export class EnterContactComponent implements OnInit {
  // one way to approach this is to pass in any/all necessary data
  @Input()
  contact: Contact;

  // also let any decisions be made somewhere
  @Output()
  save = new EventEmitter<Contact>();
  @Output()
  cancel = new EventEmitter();
  @Output()
  delete = new EventEmitter();

  contactForm: FormGroup;
  isInEditMode = false;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    // if a contact was passed in then we're in edit
    let contactToUse: Contact;
    if (!this.contact) {
      contactToUse = new Contact();
    } else {
      contactToUse = this.contact;
      this.isInEditMode = true;
    }

    this.contactForm = this.fb.group({
      firstName: [contactToUse.firstName, [Validators.required]],
      lastName: [contactToUse.lastName, [Validators.required]]
    });
  }

  onSave(): void {
    if (this.contactForm.invalid) {
      return;
    }

    const contactToSave = this.populateContact();

    this.save.emit(contactToSave);
  }
  onCancel(): void {
    this.cancel.emit();
  }
  onDelete(): void {
    this.delete.emit();
  }

  populateContact(): Contact {
    const contactToSave = new Contact();
    contactToSave.firstName = this.contactForm.get('firstName').value as string;
    contactToSave.lastName = this.contactForm.get('lastName').value as string;

    return contactToSave;
  }
}
