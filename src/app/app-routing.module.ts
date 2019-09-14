import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SearchContactsComponent } from './components/advanced/contacts/search-contacts/search-contacts.component';
import { AddContactComponent } from './components/advanced/contacts/add-contact/add-contact.component';
import { TemplateFormExampleComponent } from './components/forms/template-form-example/template-form-example.component';

const routes: Routes = [{
  path: '',
  component: AppComponent,
}, {
  path: 'contacts',
  component: SearchContactsComponent,
}, {
  path: 'contacts/add',
  component: AddContactComponent,
}, {
  path: 'template-form',
  component: TemplateFormExampleComponent,
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
