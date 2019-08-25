import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ReactiveFormExampleComponent } from './reactive-form-example.component';

describe('ReactiveFormExampleComponent', () => {
  let component: ReactiveFormExampleComponent;
  let fixture: ComponentFixture<ReactiveFormExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReactiveFormExampleComponent],
      imports: [
        ReactiveFormsModule // since we're using Reactive Forms
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveFormExampleComponent);
    component = fixture.componentInstance;
    // the first detectChanges will call onInit in our component
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should allow saving values when form is valid', () => {
    const beginningFormValidity = component.exampleForm.valid;

    const saveButtonElement = fixture.debugElement.query(By.css('#saveButton'));
    const saveButtonDisabled = saveButtonElement.properties.disabled;

    const someNameElement = fixture.debugElement.query(By.css('#someNameText'));
    someNameElement.nativeElement.value = 'updated value';
    // this is what informs that we've updated the text value
    // the form otherwise will not detect that we've directly set the value
    someNameElement.nativeElement.dispatchEvent(new Event('input'));

    const updatedFormValidity = component.exampleForm.valid;

    // we're wanting to see if the html changed, we have to detect first
    fixture.detectChanges();
    // now we can look at the current html properties
    // before it would have had the status as of the previous detectChanges (in beforeEach)
    const saveButtonDisabledAfterUpdate = saveButtonElement.properties.disabled;

    const checkBoxElement = fixture.debugElement.query(By.css('#hasCheckBox'));
    checkBoxElement.nativeElement.click();

    // because we're getting values directly from the form we do not need to
    // detectChanges from html first, reactive forms are synchronous
    const checkValue = component.exampleForm.get('hasCheck').value;

    saveButtonElement.nativeElement.click();

    expect(beginningFormValidity).toBe(false);
    expect(updatedFormValidity).toBe(true);
    expect(checkValue).toBe(true);
    expect(saveButtonDisabled).toBe(true);
    expect(saveButtonDisabledAfterUpdate).toBe(false);
    expect(component.savedValue.name).toBe('updated value');
    expect(component.savedValue.hasCheck).toBe(true);
  });

  it('should not save when required field is empty', () => {
    const saveButtonElement = fixture.debugElement.query(By.css('#saveButton'));
    saveButtonElement.nativeElement.click();
    expect(component.savedValue).toBeFalsy();
  });

  it('should have a bad test example', () => {
    // setting the form directly
    component.exampleForm.get('someName').setValue('updated value');
    component.exampleForm.get('hasCheck').setValue(true);
    // calling function directly
    component.onSaveClick();
    // we can assert the values on the object
    expect(component.savedValue.name).toBe('updated value');
    expect(component.savedValue.hasCheck).toBe(true);
  });
});
