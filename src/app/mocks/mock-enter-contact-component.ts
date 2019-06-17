import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-enter-contact',
  template: `<div> mock enter contacts component </div>`,
})
export class MockEnterContactComponent {
  // listed are all public methods that will be used outside of the component
  // any other public items are necessary for the html of the real component
  @Input()
  contact: Contact;

  @Output()
  save = new EventEmitter<Contact>();
  @Output()
  cancel = new EventEmitter();
  @Output()
  delete = new EventEmitter();
}
