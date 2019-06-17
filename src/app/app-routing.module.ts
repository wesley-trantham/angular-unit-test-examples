import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SearchContactsComponent } from './components/advanced/contacts/search-contacts/search-contacts.component';
import { AddContactComponent } from './components/advanced/contacts/add-contact/add-contact.component';

const routes: Routes = [{
  path: '',
  component: AppComponent,
}, {
  path: 'contacts',
  component: SearchContactsComponent,
},
{
  path: 'contacts/add',
  component: AddContactComponent,
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
