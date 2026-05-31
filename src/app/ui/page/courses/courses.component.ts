import { Component } from '@angular/core';
import { OverviewComponent } from '../../component/overview/overview.component';
import { FilterFormComponent } from '../../component/filter-form/filter-form.component';
import { SortFormComponent } from '../../component/sort-form/sort-form.component';

@Component({
  selector: 'app-courses',
  imports: [
    FilterFormComponent, 
    SortFormComponent, 
    OverviewComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent {}
