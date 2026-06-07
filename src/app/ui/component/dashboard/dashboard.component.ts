import { Component } from '@angular/core';
import {  DashboardService } from '../../../logic/service/dashboard/dashboard.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserI } from '../../../logic/interface/UserI';
import { User } from '../../../logic/model/User';

// UI-logiken för användarpanelen
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  private subs: Subscription;
  private dashboard: DashboardService;
  private router: Router;
  public user: UserI;

  constructor(
    dashboard: DashboardService,
    router: Router) {
    this.subs = 
      new Subscription();
    this.dashboard = dashboard;
    this.router = router;
    this.user = new User();
  }

  // Lyssna efter ändringar i användardatan
  public ngOnInit() {
    this.subs.add(
      this.getUser());
  }

  // Sluta lyssna efter ändringar i användardatan
  public ngOnDestroy() {
    this.subs.unsubscribe();
  }

  // Hämta anävndardata
  private getUser = 
    (): Subscription => {
    return this.dashboard.user$
      .subscribe(user => {
        if(user) this.user = user;
    });
  }

  // Totalt antal kurser i ramschemat
  public get total() {
    return this.dashboard
      .total();
  }

  // Totalt antal akademiska poäng
  public get points
    (): number {
    return this.dashboard
      .points();
  }

  // Ta bort en kurs
  public remCourse = (
    code: string
    ): void => {
    this.dashboard
      .remCourse(code);
  }

  // Logga ut
  public logout = 
    (): void => {
    this.dashboard
      .logout();
    this.router.navigate(
      ['/profile']);
  }
}
