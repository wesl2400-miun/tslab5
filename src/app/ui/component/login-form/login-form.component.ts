import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../../logic/service/account/account.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

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
  public mismatch: boolean;
  private router: Router;

  constructor(
    fBuilder: FormBuilder,
    account: AccountService,
    router: Router) {
    this.account = account;
    this.subs = new Subscription();
    this.mismatch = false;
    this.router = router;
    this.form = fBuilder.group({
      email: [''],
      pass: ['']
    });
  }

  public ngOnInit() {
    this.subs.add(
      this.clear());
  }

  public ngOnDestroy() {
    this.subs.unsubscribe();
  }

  private clear = 
    (): Subscription => {
    return this.form.valueChanges
      .subscribe(
      _ => {
      this.mismatch = false;
    })
  }

  public get pass(): any {
    return this.form
      .get('pass');
  }

  public submit = (): void => {
    const { email, 
      pass } = this.form
      .getRawValue();
    this.mismatch = !this.account
      .login(email, pass);
    if(!this.mismatch) {
      this.router.navigate(
        ['/profile']);
    }
  }
}
