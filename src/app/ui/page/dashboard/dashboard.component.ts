import { Component } from '@angular/core';
import { OutlineComponent } from '../../component/outline/outline.component';

@Component({
  selector: 'app-dashboard',
  imports: [OutlineComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
