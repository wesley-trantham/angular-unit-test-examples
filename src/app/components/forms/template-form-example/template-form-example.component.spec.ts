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
      imports: [FormsModule],
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

  it('should update template form value', () => {
    const templateFormDebugElement = fixture.debugElement.query(By.css('#templateFormInput'));

    templateFormDebugElement.nativeElement.value = 'updated value';
    templateFormDebugElement.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const updatedDiv = fixture.debugElement.query(By.css('#divValue'));
    expect(updatedDiv.nativeElement.innerText).toBe('updated value');

    const saveButton = fixture.debugElement.query(By.css('#saveButton'));
    saveButton.nativeElement.click();

    expect(component.clickHappened).toBe(true);
  });
});
