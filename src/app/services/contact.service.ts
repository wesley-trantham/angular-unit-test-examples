import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Contact } from '../models/contact.model';
import { constructDependencies } from '@angular/core/src/di/reflective_provider';
import { debounceTime, debounce, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  searchContacts(searchInput: string): Observable<Contact[]> {
    // here we would make an http call to our api
    // the api would then return a list of contacts
    // any property mappings necessary would be done here instead of in a component
    const contacts = this.getDefaultContacts(searchInput.length);

    const results = of(contacts).pipe(delay(1000));

    return results;
  }

  getContactById(id: number): Observable<Contact> {
    const contact = this.getDefaultContacts[0];
    return of(contact);
  }

  constructor() { }

  getDefaultContacts(length: number): Contact[] {
    const contacts = new Array<Contact>();

    if (length === 0) {
      contacts.push(this.generateContact(0));
      contacts.push(this.generateContact(1));
    } else {
      let index = 0;
      while (index < length) {
        contacts.push(this.generateContact(index));
        index++;
      }
    }

    return contacts;
  }

  generateContact(id: number): Contact {
    const contact = new Contact();

    contact.id = id;
    contact.firstName = 'first ' + id;
    contact.lastName = 'last ' + id;

    return contact;
  }

  insertContact(contact: Contact): Observable<Contact> {
    // usually you'd do an http call here

    // delay of 1 second to make it act like a real call
    return of(contact).pipe(delay(1000));
  }

  updateContact(contact: Contact): Observable<boolean> {

    return of(true).pipe(delay(1000));
  }

  deleteContact(contactId: number): Observable<boolean> {

    return of(true).pipe(delay(1000));
  }
}

