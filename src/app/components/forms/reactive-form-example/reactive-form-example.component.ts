import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form-example',
  templateUrl: './reactive-form-example.component.html',
  styleUrls: ['./reactive-form-example.component.css']
})
export class ReactiveFormExampleComponent implements OnInit {
  exampleForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.exampleForm = this.formBuilder.group({
      someName: ['', [Validators.required]],
      hasCheck: [false],
    });
  }

  onSaveClick(): void {
    if (this.exampleForm.invalid) {
      return;
    }
    // assign values,
    const values = {
      name: this.exampleForm.get('someName').value,
      hasCheck : this.exampleForm.get('hasCheck').value,
    };
    // save values
  }
}
