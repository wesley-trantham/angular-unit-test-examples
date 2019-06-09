import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterContactComponent } from './enter-contact.component';

describe('EnterContactComponent', () => {
  let component: EnterContactComponent;
  let fixture: ComponentFixture<EnterContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
