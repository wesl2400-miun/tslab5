import { Component } from '@angular/core';
import { OverviewComponent } from '../../component/overview/overview.component';
import { FilterFormComponent } from '../../component/filter-form/filter-form.component';
import { SortFormComponent } from '../../component/sort-form/sort-form.component';

@Component({
  selector: 'app-home',
  imports: [
    FilterFormComponent, 
    SortFormComponent, 
    OverviewComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
