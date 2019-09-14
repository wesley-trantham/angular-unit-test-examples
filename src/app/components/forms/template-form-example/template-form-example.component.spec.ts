import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TemplateFormExampleComponent } from './template-form-example.component';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';

describe('TemplateFormExampleComponent', () => {
  let component: TemplateFormExampleComponent;
  let fixture: ComponentFixture<TemplateFormExampleComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateFormExampleComponent],
      imports: [
        FormsModule // required for Template Forms
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateFormExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // making this method async to allow us to await fixture.whenStable
  it('should update template form value', async () => {
    // this works because the id in the html is templateFormInput
    // notice we put a # in front - which is a css syntax for id
    const billingInput = debugElement.query(By.css('#billingAddress'));
    // set the value of the textbox in the html
    billingInput.nativeElement.value = 'updated value';
    // necessary to let the form know it has been changed
    billingInput.nativeElement.dispatchEvent(new Event('input'));
    // to see how the html has changed we need to detect changes
    const copyButton = debugElement.query(By.css('#copyButton'));
    copyButton.nativeElement.click();

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const shippingInput = debugElement.query(By.css('#shippingAddress'));
    expect(shippingInput.nativeElement.value).toBe('updated value');
  });
});
