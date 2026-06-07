import { Injectable } from '@angular/core';
import { UserI } from '../../interface/UserI';
import { Account } from '../../model/Account';
import { DashboardService } from '../dashboard/dashboard.service';

// Tjänsten för kontoregistrering
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private account: Account;
  private dashboard: DashboardService;
  
  constructor(
    dashboard: DashboardService) {
    this.account = 
      new Account();
    this.dashboard = 
      dashboard;
  }

  // Kolla dubbletter
  public duplicate = (
    email: string
    ): boolean => {
    return this.account
      .exists(email);
  }

  // Logga in
  public login = (
    email: string, 
    pass: string
    ): boolean => {
    const user = 
      this.account
        .login(email, pass);
    this.dashboard
      .update(user);
    return user !== null;
  }

  // Skapa konto
  public create = (
    newUser: UserI
    ): boolean => {
    const user = 
      this.account
      .create(newUser);
    this.dashboard
      .update(user);
    return user !== null;
  }
}
