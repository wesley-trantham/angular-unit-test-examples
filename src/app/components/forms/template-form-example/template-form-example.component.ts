import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-form-example',
  templateUrl: './template-form-example.component.html',
  styleUrls: ['./template-form-example.component.css']
})
export class TemplateFormExampleComponent implements OnInit {
  someText: string;
  clickHappened = false;

  constructor() { }

  ngOnInit() {
  }

  isValid(): boolean {
    return !!this.someText && this.someText.length > 0;
  }

  onClick(): void {
    if (this.isValid()) {
      this.clickHappened = true;
    }
  }
}
