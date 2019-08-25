import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { take, finalize } from 'rxjs/operators';

export class SaveService {
  saveItem(values: any): Observable<boolean> {
    return of(true);
  }
}

@Component({
  selector: 'app-reactive-form-example',
  templateUrl: './reactive-form-example.component.html',
  styleUrls: ['./reactive-form-example.component.css']
})
export class ReactiveFormExample2Component implements OnInit {
  exampleForm: FormGroup;
  isSaving = false;
  isSaveSuccessful = false;

  constructor(
    private formBuilder: FormBuilder,
    private saveService: SaveService,
  ) { }

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
    this.isSaving = true;
    // assign values,
    const values = {
      name: this.exampleForm.get('someName').value,
      hasCheck: this.exampleForm.get('hasCheck').value,
    };
    // save values
    this.saveService.saveItem(values)
      .pipe(take(1),
        finalize(() => this.isSaving = false))
      .subscribe(result => {
        this.isSaveSuccessful = result;
      });
  }
}
