import { NgModule } from '@angular/core';

import { FakeEnterContactComponent } from './fake-enter-contact-component';

@NgModule({
  declarations: [
    // adding our fakes here
    // otherwise aot doesn't know what to do
    FakeEnterContactComponent
  ]
})
export class FakeModule { }
