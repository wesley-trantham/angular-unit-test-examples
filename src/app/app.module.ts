import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddContactComponent } from './components/advanced/contacts/add-contact/add-contact.component';
import { EditContactComponent } from './components/advanced/contacts/edit-contact/edit-contact.component';
import { EnterContactComponent } from './components/advanced/contacts/enter-contact/enter-contact.component';
import { SearchContactsComponent } from './components/advanced/contacts/search-contacts/search-contacts.component';
import { ReactiveFormExampleComponent } from './components/forms/reactive-form-example-1/reactive-form-example.component';
import { ReactiveFormExample2Component } from './components/forms/reactive-form-example-2/reactive-form-example.component';
import { TemplateFormExampleComponent } from './components/forms/template-form-example/template-form-example.component';
import { ContactService } from './services/contact.service';

@NgModule({
  declarations: [
    AppComponent,
    TemplateFormExampleComponent,
    ReactiveFormExampleComponent,
    ReactiveFormExample2Component,
    SearchContactsComponent,
    AddContactComponent,
    EditContactComponent,
    EnterContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ContactService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
