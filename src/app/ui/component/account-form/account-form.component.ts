import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../logic/service/account/account.service';
import { User } from '../../../logic/model/User';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

// UI-logik för kontoregistrering
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
  public confPass: boolean;
  private dupSbj: BehaviorSubject<boolean>;
  public duplicate$: Observable<boolean>;

  constructor(
    fBuilder: FormBuilder,
    account: AccountService,
    router: Router) {
    this.account = account;
    this.subs = 
      new Subscription();
    this.dupSbj = 
      new BehaviorSubject(false);
    this.duplicate$ = this.dupSbj
      .asObservable();
    this.confPass = false;
    this.router = router;
    this.form = 
      this.initForm(
        fBuilder);
  }

  // Prenumera på clear() strömmen
  public ngOnInit() {
    this.subs.add(
      this.clear());
  }

  // Avprenumerera alla händelseströmmar som observeras
  public ngOnDestroy() {
    this.subs.unsubscribe();
  }

  // Lyssna efter uppdateringar av kontoformuläret
  private clear = 
    (): Subscription => {
    return this.form
      .valueChanges
      .subscribe(
        form => {
      const { pass, 
        confpass } = form;
      this.confPass = 
        pass !== confpass; 
    });
  }

  // Koppla upp kontoformuläret
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
      ]],
      confpass: ['']
    });
  }

  // Fältet för förnamn
  public get fName(): any {
    return this.form
      .get('fName');
  }

  // Fältet för efternamn
  public get lName(): any {
    return this.form
      .get('lName');
  }

  // Fältet för e-post
  public get email(): any {
    return this.form
      .get('email');
  }

  // Fältet för lösenord
  public get pass(): any {
    return this.form
      .get('pass');
  }

  // Rensa duplikat meddelandet när fälten fokuseras
  public onFocus = 
    (): void => {
    this.dupSbj
      .next(false);
  }

  // Försök skapa konto när formuläret skickas
  public submit = 
    (): void => {
    if(this.form.invalid)
      return;
    const { fName, lName, 
      email, pass
      } = this.form
      .getRawValue();
    this.checkDup(email);
    const user = new User(
      fName, lName, 
      email, pass);
    const success = 
      this.account
        .create(user);
    if(success) {
      this.router.navigate(
        ['/profile']);
    }
  }

  // Visa felmeddelandet om dubletterna finns
  private checkDup = 
    (email: string): void => {
    const duplicate = 
      this.account
      .duplicate(email);
    if(duplicate) {
      this.dupSbj
      .next(true);
    }
  }
}
