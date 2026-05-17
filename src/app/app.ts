import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Network } from './logic/service/network';
import { BehaviorSubject, Observable } from 'rxjs';
import { URL } from './logic/ref/url';
import { Outline } from './logic/service/outline';
import { Course } from './logic/model/Course';
import { Error } from './logic/service/error';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tslab5');

  constructor() {
    
  }
}
