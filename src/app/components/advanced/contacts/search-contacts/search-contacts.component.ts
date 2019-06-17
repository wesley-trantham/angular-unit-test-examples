import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, startWith, switchMap } from 'rxjs/operators';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-search-contacts',
  templateUrl: './search-contacts.component.html',
  styleUrls: ['./search-contacts.component.css']
})
export class SearchContactsComponent implements OnInit {
  searchInput = new FormControl('');
  searchResults: Observable<Contact[]>;

  constructor(
    private contactService: ContactService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.searchResults = this.searchInput.valueChanges
      .pipe(
        startWith(''),
        // to prevent searching on every character,
        // wait 200 ms without additional input before searching
        debounceTime(200),
        // since we're getting an observable back inside of an observable
        // we will do a switchMap
        // the switchMap will also cancel any outstanding call when you make a new one
        switchMap(searchInput => {
          return this.contactService.searchContacts(searchInput);
        })
      );
  }

  onAddContactClick(): Promise<boolean> {
    // route to add contacts component
    return this.router.navigate(['/contacts/add']);
  }
}
