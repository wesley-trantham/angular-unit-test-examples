import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SearchContactsComponent } from './components/advanced/contacts/search-contacts/search-contacts.component';

const routes: Routes = [{
  path: '',
  component: AppComponent,
}, {
  path: 'contacts',
  component: SearchContactsComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
