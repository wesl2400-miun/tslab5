import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../../logic/service/account/account.service';
import { Router, RouterLink } from '@angular/router';
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
  private subs: Subscription;
  private account: AccountService;
  private misSbj: BehaviorSubject<boolean>;
  public mismatch$: Observable<boolean>;

  private router: Router;

  constructor(
    fBuilder: FormBuilder,
    account: AccountService,
    router: Router) {
    this.account = account;
    this.subs = new Subscription();
    this.misSbj = 
      new BehaviorSubject(false);
    this.mismatch$ = this.misSbj
      .asObservable();
    this.router = router;
    this.form = fBuilder.group({
      email: [''],
      pass: ['']
    });
  }

  public get pass(): any {
    return this.form
      .get('pass');
  }

  public submit = 
    async (): Promise<void> => {
    const { email, 
      pass } = this.form
      .getRawValue();
    const mismatch =
      !await this.account
        .login(email, pass);
    this.misSbj.next(
      mismatch);
    if(!mismatch) {
      this.router.navigate(
        ['/profile']);
    }
  }
}
