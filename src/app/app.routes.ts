import { Routes } from '@angular/router';

import { CoursesComponent } from './ui/page/courses/courses.component';
import { ProfileComponent } from './ui/page/profile/profile.component';
import { RegisterComponent } from './ui/page/register/register.component';
import { HomeComponent } from './ui/page/home/home.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'register', component: RegisterComponent }
];
