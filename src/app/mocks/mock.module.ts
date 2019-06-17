import { NgModule } from '@angular/core';

import { MockEnterContactComponent } from './mock-enter-contact-component';

@NgModule({
  declarations: [
    // adding our mocks here
    // otherwise aot doesn't know what to do
    MockEnterContactComponent
  ]
})
export class MockModule { }
