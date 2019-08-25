import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';

import { ReactiveFormExample2Component, SaveService } from './reactive-form-example.component';

describe('ReactiveFormExampleComponent', () => {
  let component: ReactiveFormExample2Component;
  let fixture: ComponentFixture<ReactiveFormExample2Component>;
  let saveServiceTemplate: SaveService;

  beforeEach(async(() => {
    saveServiceTemplate = jasmine.createSpyObj<SaveService>('save service', ['saveItem']);

    TestBed.configureTestingModule({
      declarations: [ReactiveFormExample2Component],
      imports: [
        ReactiveFormsModule // since we're using Reactive Forms
      ],
      providers: [
        // a copy of saveServiceTemplate will be made for each test
        { provide: SaveService, useValue: saveServiceTemplate }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveFormExample2Component);
    component = fixture.componentInstance;
    // the first detectChanges will call onInit in our component
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should allow saving values when form is valid', () => {
    // obtain the instance of saveService used in this test
    const saveService = TestBed.get(SaveService) as SaveService;
    const saveSubject = new Subject<boolean>();
    // set up what should happen when saveItem is called
    // in this case a subject that we can control
    (saveService.saveItem as jasmine.Spy).and.returnValue(saveSubject);
    const beginningFormValidity = component.exampleForm.valid;
    expect(beginningFormValidity).toBe(false);

    const saveButtonElement = fixture.debugElement.query(By.css('#saveButton'));
    const saveButtonDisabled = saveButtonElement.properties.disabled;
    expect(saveButtonDisabled).toBe(true);

    const someNameElement = fixture.debugElement.query(By.css('#someNameText'));
    someNameElement.nativeElement.value = 'updated value';
    // this is what informs that we've updated the text value
    // the form otherwise will not detect that we've directly set the value
    someNameElement.nativeElement.dispatchEvent(new Event('input'));

    const updatedFormValidity = component.exampleForm.valid;
    expect(updatedFormValidity).toBe(true);

    // we're wanting to see if the html changed, we have to detect first
    fixture.detectChanges();
    // now we can look at the current html properties
    // before it would have had the status as of the previous detectChanges (in beforeEach)
    const saveButtonDisabledAfterUpdate = saveButtonElement.properties.disabled;
    expect(saveButtonDisabledAfterUpdate).toBe(false);

    const checkBoxElement = fixture.debugElement.query(By.css('#hasCheckBox'));
    checkBoxElement.nativeElement.click();

    // because we're getting values directly from the form we do not need to
    // detectChanges from html first, reactive forms are synchronous
    const checkValue = component.exampleForm.get('hasCheck').value;
    expect(checkValue).toBe(true);

    saveButtonElement.nativeElement.click();

    // show that save button is now disabled as we're saving
    // currently showing what happens while we wait for the service to save
    fixture.detectChanges();
    const saveButtonDisabledDuringSave = saveButtonElement.properties.disabled;
    expect(saveButtonDisabledDuringSave).toBe(true);

    const saveSuccessfulDivElementDuringSave = fixture.debugElement.query(By.css('#saveSuccessfulDiv'));
    expect(saveSuccessfulDivElementDuringSave == null).toBe(true);

    // complete the api save by giving the subject a value
    saveSubject.next(true);
    fixture.detectChanges();
    const saveButtonDisabledAfterSuccessfulSave = saveButtonElement.properties.disabled;
    expect(saveButtonDisabledAfterSuccessfulSave).toBe(false);

    const saveSuccessfulDivElementAfterSave = fixture.debugElement.query(By.css('#saveSuccessfulDiv'));
    expect(saveSuccessfulDivElementAfterSave).toBeTruthy();
  });
});
