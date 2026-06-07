import { Component } from '@angular/core';
import { AccountFormComponent } from '../../component/account-form/account-form.component';

// UI-logik för registreringssida
@Component({
  selector: 'app-register',
  imports: [AccountFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {}
