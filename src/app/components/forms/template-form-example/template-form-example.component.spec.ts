import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TemplateFormExampleComponent } from './template-form-example.component';
import { FormsModule } from '@angular/forms';

describe('TemplateFormExampleComponent', () => {
  let component: TemplateFormExampleComponent;
  let fixture: ComponentFixture<TemplateFormExampleComponent>;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // making this method async to allow us to await fixture.whenStable
  it('should update template form value', async () => {
    // this works because the id in the html is templateFormInput
    // notice we put a # in front - which is a css syntax for id
    const templateFormDebugElement = fixture.debugElement.query(By.css('#templateFormInput'));

    // set the value of the textbox in the html
    templateFormDebugElement.nativeElement.value = 'updated value';
    // necessary to let the form know it has been changed
    templateFormDebugElement.nativeElement.dispatchEvent(new Event('input'));

    // to see how the html has changed we need to detect changes
    fixture.detectChanges();
    // while this example works without whenStable
    // template forms are async, so there are occasions when you need it
    await fixture.whenStable();

    const updatedDiv = fixture.debugElement.query(By.css('#divValue'));
    expect(updatedDiv.nativeElement.innerText).toBe('updated value');

    const saveButton = fixture.debugElement.query(By.css('#saveButton'));
    saveButton.nativeElement.click();

    expect(component.clickHappened).toBe(true);
  });
});
