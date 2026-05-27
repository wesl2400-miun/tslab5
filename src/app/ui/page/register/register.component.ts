import { Component } from '@angular/core';
import { AccountFormComponent } from '../../component/account-form/account-form.component';

@Component({
  selector: 'app-register',
  imports: [AccountFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {}
