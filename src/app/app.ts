import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Network } from './logic/service/network';
import { Subscription } from 'rxjs';
import { Courses } from './logic/service/courses';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tslab5');
  private subs: Subscription;
  private network: Network;
  private courses: Courses;

  constructor(
    network: Network,
    courses: Courses) {
    this.subs = new Subscription();
    this.network = network;
    this.courses = courses;
  }

  public ngOnInit() {
    this.subs.add(this.courses
      .fetch(this.network));
  }

  public ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
