import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

import { SearchContactsComponent } from './search-contacts.component';
import { DebugElement } from '@angular/core';

describe('SearchContactsComponent', () => {
  let component: SearchContactsComponent;
  let fixture: ComponentFixture<SearchContactsComponent>;
  let fakeContactServiceTemplate: ContactService;
  let fakeContactService: ContactService;
  let searchResults: BehaviorSubject<Contact[]>;
  let mockRouter: Router;
  let debugElement: DebugElement;

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
    debugElement = fixture.debugElement;
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

    const resultsTableElement = debugElement.query(By.css('#resultsTableId'));
    expect(resultsTableElement.children.length).toBe(0);
    expect(fakeContactService.searchContacts).toHaveBeenCalled();
  });

  it('should search for contacts when new value entered', async () => {
    const searchInput = debugElement.query(By.css('#searchInputId'));
    const textBox: HTMLInputElement = searchInput.nativeElement;
    textBox.value = 'new search term';
    textBox.dispatchEvent(new Event('input'));

    // now the fake will return two results
    searchResults.next(getDefaultContacts());
    // awaiting past the debounceTime
    await fixture.whenStable();
    // telling the html to update
    fixture.detectChanges();

    const resultsTableElement = debugElement.query(By.css('#resultsTableId'));
    const firstRow = resultsTableElement.children[0];
    const firstTd: HTMLTableCellElement = firstRow.children[0].nativeElement;
    const secondTd: HTMLTableCellElement = firstRow.children[1].nativeElement;
    expect(firstTd.innerText).toBe('first 0');
    expect(secondTd.innerText).toBe('last 0');
  });

  it('should not search archived contacts when not checked', async () => {
    const spy: jasmine.SpyObj<ContactService> = TestBed.get(ContactService);
    spy.searchContacts.calls.reset(); // reset since initial search happened during onInit
    await searchWith('test', false); // search again

    expect(spy.searchContacts).toHaveBeenCalledWith('test', false);
  });

  it('should search archived contacts when checked', async () => {
    const spy: jasmine.SpyObj<ContactService> = TestBed.get(ContactService);
    spy.searchContacts.calls.reset(); // reset since initial search happened during onInit
    await searchWith('test 2', true); // search again

    expect(spy.searchContacts).toHaveBeenCalledWith('test 2', true);
  });

  it('should be able to search twice', async () => {
    const spy: jasmine.SpyObj<ContactService> = TestBed.get(ContactService);
    spy.searchContacts.calls.reset();

    await searchWith('test', false);
    await searchWith('test 2', true);

    const firstSearch = spy.searchContacts.calls.first();
    const secondSearch = spy.searchContacts.calls.mostRecent();

    expect(spy.searchContacts).toHaveBeenCalledTimes(2);
    expect(firstSearch.args).toEqual(['test', false]);
    expect(secondSearch.args).toEqual(['test 2', true]);
  });

  async function searchWith(input: string, archived: boolean): Promise<void> {
    const searchInput = debugElement.query(By.css('#searchInputId'));
    const textBox: HTMLInputElement = searchInput.nativeElement;
    textBox.value = input;
    textBox.dispatchEvent(new Event('input'));

    if (archived) {
      const checkBox = debugElement.query(By.css('#searchArchivedId'));
      checkBox.nativeElement.click();
    }
    searchResults.next(getDefaultContacts());
    await fixture.whenStable();
    fixture.detectChanges();
  }
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
