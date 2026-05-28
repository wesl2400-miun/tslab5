import { Injectable } from '@angular/core';
import { UserI } from '../../interface/UserI';
import { Account } from '../../model/Account';
import { DashboardService } from '../dashboard/dashboard.service';
import { DialogService } from '../dialog/dialog.service';
import { Message } from '../../model/Message';
import { DIALOG } from '../../ref/dialog';
import { CSS_CLASS } from '../../ref/cssClass';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private account: Account;
  private dashboard: DashboardService;
  private dialog: DialogService;
  
  constructor(
    dashboard: DashboardService,
    dialog: DialogService) {
    this.account = 
      new Account();
    this.dashboard = 
      dashboard;
    this.dialog = dialog;
  }

  private duplicate = (
    email: string
    ): boolean => {
    return this.account
      .exists(email);
  }

  public login = async (
    email: string, 
    pass: string
    ): Promise<boolean> => {
    const user = 
      await this.account
      .login(email, 
        pass);
    this.dashboard
      .update(user);
    return this.onError(
      user, DIALOG
      .LOGIN_FAILURE);
  }

  public create = async (
    newUser: UserI
    ): Promise<boolean> => {
    const { email } = newUser;
    if(this.duplicate(email)) {
      this.dialog.update(
        new Message(
        DIALOG.REG_DUPLICATE, 
        CSS_CLASS.DIAG_ERR));
      return false;
    }
    const user = 
      await this.account
      .create(newUser);
    this.dashboard
      .update(user);
    return this.onError(
      user, DIALOG
      .REG_FAILURE);
  }

  private onError = (
    user: UserI | null,
    content: string
    ): boolean => {
    const success = 
      user !== null;
    if(!success) {
      const msg = 
        new Message(
          content, 
        CSS_CLASS
        .DIAG_ERR);
      this.dialog
        .update(msg);
    }
    return success;
  }
}
