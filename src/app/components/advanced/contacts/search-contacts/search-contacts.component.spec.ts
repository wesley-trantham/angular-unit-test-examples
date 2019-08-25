import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

import { SearchContactsComponent } from './search-contacts.component';

describe('SearchContactsComponent', () => {
  let component: SearchContactsComponent;
  let fixture: ComponentFixture<SearchContactsComponent>;
  let fakeContactServiceTemplate: ContactService;
  let fakeContactService: ContactService;
  let searchResults: BehaviorSubject<Contact[]>;
  let mockRouter: Router;

  beforeEach(async(() => {
    searchResults = new BehaviorSubject<Contact[]>([]);
    // we will use a mock service so that we control behavior
    // also we don't want changes to the real one to break this spec
    // like if we added a new dependency
    fakeContactServiceTemplate = jasmine.createSpyObj<ContactService>('contact service', ['searchContacts']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [SearchContactsComponent],
      imports: [
        ReactiveFormsModule, // for our FormControl
      ],
      providers: [
        { provide: ContactService, useValue: fakeContactServiceTemplate },
        { provide: Router, useValue: mockRouter },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchContactsComponent);
    component = fixture.componentInstance;
    // providing the service creates a copy of the object
    // here we're getting the service active for this test
    fakeContactService = fixture.debugElement.injector.get(ContactService);
    (fakeContactService.searchContacts as jasmine.Spy).and.returnValue(searchResults);
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
    expect(fakeContactService.searchContacts).toHaveBeenCalled();
  });

  it('should search for contacts when new value entered', async () => {
    const searchInput = fixture.debugElement.query(By.css('#searchInputId'));
    const textBox: HTMLInputElement = searchInput.nativeElement;
    textBox.value = 'new search term';
    textBox.dispatchEvent(new Event('input'));

    // now the fake will return two results
    searchResults.next(getDefaultContacts());
    // awaiting past the debounceTime
    await fixture.whenStable();
    // telling the html to update
    fixture.detectChanges();

    const resultsTableElement = fixture.debugElement.query(By.css('#resultsTableId'));
    const tableBodyElement = resultsTableElement.children[0];
    expect(tableBodyElement.children.length).toBe(2);
    const firstRow = tableBodyElement.children[0];
    const firstTd: HTMLTableCellElement = firstRow.children[0].nativeElement;
    const secondTd: HTMLTableCellElement = firstRow.children[1].nativeElement;
    expect(firstTd.innerText).toBe('first 0');
    expect(secondTd.innerText).toBe('last 0');
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
