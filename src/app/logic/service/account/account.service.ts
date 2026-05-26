import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserI } from '../../interface/UserI';
import { Account } from '../../model/Account';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private accSbj: BehaviorSubject<Account>;
  public account$: Observable<Account>;
  
  constructor() {
    this.accSbj = 
      new BehaviorSubject(
        new Account());
    this.account$ = this.accSbj
      .asObservable();
  }

  public exists = (
    email: string
    ): boolean => {
    const account = 
      this.accSbj
        .getValue();
    return account
      .exists(email);
  }

  public logout = 
    (): void => {
    const account = 
      this.accSbj
        .getValue();
    account.logout();
    this.accSbj.next(
      account);
  }

  public login = (
    email: string, 
    pass: string
    ): boolean => {
    const account = 
      this.accSbj
        .getValue();
    const match = 
      account.login(
        email, pass);
    this.accSbj.next(
      account);
    return match;
  }


  public create = (
    user: UserI
    ): boolean => {
    const account = 
      this.accSbj
        .getValue();
    const success =
      account.create(user);
    this.accSbj
        .next(account);
    return success;
  }
}
