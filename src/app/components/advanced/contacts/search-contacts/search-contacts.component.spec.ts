import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

import { SearchContactsComponent } from './search-contacts.component';

describe('SearchContactsComponent', () => {
  let component: SearchContactsComponent;
  let fixture: ComponentFixture<SearchContactsComponent>;
  let mockContactServiceTemplate: ContactService;
  let mockContactService: ContactService;
  let searchResults: BehaviorSubject<Contact[]>;

  beforeEach(async(() => {
    searchResults = new BehaviorSubject<Contact[]>([]);
    mockContactServiceTemplate = jasmine.createSpyObj<ContactService>('contact service', ['searchContacts']);
    // (mockContactServiceTemplate.searchContacts as jasmine.Spy).and.returnValue(searchResults);
    TestBed.configureTestingModule({
      declarations: [SearchContactsComponent],
      imports: [
        ReactiveFormsModule, // for our FormControl
      ],
      providers: [
        { provide: ContactService, useValue: mockContactServiceTemplate },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchContactsComponent);
    component = fixture.componentInstance;
    // providing the service creates a copy of the object
    // here we're getting the service active for this test
    mockContactService = fixture.debugElement.injector.get(ContactService);
    (mockContactService.searchContacts as jasmine.Spy).and.returnValue(searchResults);
    fixture.detectChanges(); // ngOnInit fires here as it is the first detectChanges

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // using async
  it('should search for contacts on init', async () => {
    // awaiting past the debounceTime
    await fixture.whenStable();
    fixture.detectChanges();

    const resultsTableElement = fixture.debugElement.query(By.css('#resultsTableId'));
    const tableBodyElement = resultsTableElement.children[0];
    expect(tableBodyElement.children.length).toBe(0);
  });

  it('should search for contacts when new value entered', async () => {
    // awaiting past the debounceTime
    await fixture.whenStable();
    fixture.detectChanges();

    const searchInput = fixture.debugElement.query(By.css('#searchInputId'));
    searchInput.nativeElement.value = 'new search term';
    searchInput.nativeElement.dispatchEvent(new Event('input'));

    // now the mock will return two results
    searchResults.next(getDefaultContacts());
    // awaiting past the debounceTime
    await fixture.whenStable();
    // telling the html to update
    fixture.detectChanges();

    const resultsTableElement = fixture.debugElement.query(By.css('#resultsTableId'));
    const tableBodyElement = resultsTableElement.children[0];
    expect(tableBodyElement.children.length).toBe(2);
  });
});

function getDefaultContacts(): Contact[] {
  const contacts = new Array<Contact>();
  contacts.push(generateContact(0));
  contacts.push(generateContact(1));

  return contacts;
}

function generateContact(id: number) {
  const contact = new Contact();
  contact.firstName = 'first ' + id.toString();
  contact.lastName = 'last ' + id.toString();

  return contact;
}
