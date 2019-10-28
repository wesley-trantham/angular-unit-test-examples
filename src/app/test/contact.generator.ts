import { Contact } from '../models/contact.model';

export class ContactGenerator {
  static getDefaultContact(): Contact {
    const contact = new Contact();
    contact.firstName = 'Edit';
    contact.id = 123;
    contact.lastName = 'Contact';
    return contact;
  }
}
