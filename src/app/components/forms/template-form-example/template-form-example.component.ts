import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-form-example',
  templateUrl: './template-form-example.component.html',
  styleUrls: ['./template-form-example.component.css']
})
export class TemplateFormExampleComponent implements OnInit {
  billingAddress: string;
  shippingAddress: string;

  constructor() { }

  ngOnInit() {
  }

  onCopyClick(): void {
    this.shippingAddress = this.billingAddress;
  }
}
