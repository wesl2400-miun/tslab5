import { Component } from '@angular/core';
import { LoginFormComponent } from '../../component/login-form/login-form.component';
import { Observable } from 'rxjs';
import { UserI } from '../../../logic/interface/UserI';
import { AccountService } from '../../../logic/service/account/account.service';
import { extract$ } from '../../../logic/util/utils';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    DashboardComponent,
    LoginFormComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  public logged$: Observable<UserI>;
  public user$: Observable<UserI>;

  constructor(
    account: AccountService) {
    const { account$ 
      } = account;
    this.logged$ = extract$(
      account$, 'logged', true);
    this.user$ = extract$(
      account$, 'user');
  }
}
