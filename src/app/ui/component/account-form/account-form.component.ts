import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../logic/service/account/account.service';
import { User } from '../../../logic/model/User';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.css',
})
export class AccountFormComponent {
  public form: FormGroup;
  private subs: Subscription;
  private account: AccountService;
  private router: Router;
  public exists: boolean;

  constructor(
    fBuilder: FormBuilder,
    account: AccountService,
    router: Router) {
    this.account = account;
    this.subs = 
      new Subscription();
    this.exists = false;
    this.router = router;
    this.form = 
      this.initForm(
        fBuilder);
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
    return this.form
      .valueChanges
      .subscribe(
        _ => {
      if(this.exists) {
        this.exists = false;
        console.log(this.exists);
      }    
    });
  }

  private initForm = (
    fBuilder: FormBuilder
    ): FormGroup =>{
    return fBuilder.group({
      fName: ['', [
        Validators.required]],
      lName: ['', [
        Validators.required]],
      email: ['', [
        Validators.required, 
        Validators.email]],
      pass: ['', [
        Validators.required, 
        Validators.minLength(8), 
        Validators.pattern(
          /^(?=.*[0-9])(?=.*[!@?+&%$]).+$/),
      ]]
    });
  }

  public get fName(): any {
    return this.form
      .get('fName');
  }

  public get lName(): any {
    return this.form
      .get('lName');
  }

  public get email(): any {
    return this.form
      .get('email');
  }

  public get pass(): any {
    return this.form
      .get('pass');
  }

  public submit = 
    async (): Promise<void> => {
    if(this.form.invalid)
      return;
    const { fName, lName, 
      email, pass
      } = this.form
      .getRawValue();
    this.exists = this.account
      .exists(email);
    const user = new User(
      fName, lName, 
      email, pass);
    const success = 
      await this.account
        .create(user);
    if(success) {
      this.router.navigate(
        ['/profile']);
    }
  }
}
