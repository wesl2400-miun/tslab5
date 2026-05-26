import { Routes } from '@angular/router';

import { HomeComponent } from './ui/page/home/home.component';
import { DashboardComponent } from './ui/page/dashboard/dashboard.component';
import { ProfileComponent } from './ui/page/profile/profile.component';
import { AccountFormComponent } from './ui/component/account-form/account-form.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'account', component: AccountFormComponent }
];
