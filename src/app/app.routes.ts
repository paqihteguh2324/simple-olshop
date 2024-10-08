import { Routes } from '@angular/router';
import { CustomerPageComponent } from './customer/customer-page/customer-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'customer', component: CustomerPageComponent }
];
