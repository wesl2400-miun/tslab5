import { Component } from '@angular/core';
import { LoginFormComponent } from '../../component/login-form/login-form.component';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../../component/dashboard/dashboard.component';
import { DashboardService } from '../../../logic/service/dashboard/dashboard.service';

// UI-logik för Mina Sidor
@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    DashboardComponent,
    LoginFormComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  private dashboard: DashboardService;

  constructor(
    dashboard: DashboardService) {
    this.dashboard = dashboard;
  }

  // Kolla om användaren är inloggad
  public logged = 
    (): boolean => {
    return this.dashboard
      .logged();
  }
}
