import { Routes } from '@angular/router';

import { HomeComponent } from './ui/page/home/home.component';
import { DashboardComponent } from './ui/page/dashboard/dashboard.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent }
];
