import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../../logic/service/account/account.service';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-login-form',
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterLink],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  public form: FormGroup;
  private account: AccountService;
  private errsSbj: BehaviorSubject<boolean>;
  public errors$: Observable<boolean>;

  constructor(
    fBuilder: FormBuilder,
    account: AccountService) {
    this.account = account;
    this.errsSbj = 
      new BehaviorSubject(false);
    this.errors$ = this.errsSbj
      .asObservable();
    this.form = fBuilder.group({
      email: [''],
      pass: ['']
    });
  }

  public get pass(): any {
    return this.form
      .get('pass');
  }

  public onFocus = 
    (): void => {
    this.errsSbj
      .next(false);
  }

  public submit = 
    (): void => {
    const { email, 
      pass } =  this.form
      .getRawValue();
    const success = this.account
      .login(email, pass);
    this.errsSbj
      .next(!success);
  }
}
