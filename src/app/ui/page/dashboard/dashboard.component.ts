import { Component } from '@angular/core';
import { OutlineComponent } from '../../component/outline/outline.component';
import { AccountService } from '../../../logic/service/account/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [OutlineComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  private account: AccountService;
  private router: Router;

  constructor(
    account: AccountService,
    router: Router) {
    this.account = account;
    this.router = router;
  }

  public logout = 
    (): void => {
    this.account
      .logout();
    this.router.navigate(
      ['/profile']);
  }
}
