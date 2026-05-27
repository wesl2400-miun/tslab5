import { Routes } from '@angular/router';

import { HomeComponent } from './ui/page/home/home.component';
import { ProfileComponent } from './ui/page/profile/profile.component';
import { RegisterComponent } from './ui/page/register/register.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'register', component: RegisterComponent }
];
