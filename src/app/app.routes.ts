import { Routes } from '@angular/router';
import { Testing } from './ui/page/testing/testing';
import { CList } from './ui/component/clist/clist';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: CList },
  { path: 'testing', component: Testing }
];
