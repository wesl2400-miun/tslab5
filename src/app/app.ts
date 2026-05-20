import { Component, signal } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Network } from './logic/service/network';
import { Subscription } from 'rxjs';
import { Courses } from './logic/service/courses';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tslab5');
  private router: Router;
  private subs: Subscription;
  private network: Network;
  private courses: Courses;

  constructor(
    router: Router,
    network: Network,
    courses: Courses) {
    this.router = router;
    this.subs = new Subscription();
    this.network = network;
    this.courses = courses;
  }

  public ngOnInit() {
    this.subs.add(this.courses
      .fetch(this.network));
    this.subs.add(this.onRoute());
  }

  public ngOnDestroy() {
    this.subs.unsubscribe();
  }

  private onRoute = 
    (): Subscription => {
    return this.router
      .events
      .subscribe(val => {
        if(val instanceof 
          NavigationStart) {
          this.courses.
            onRoute();
        }
      })
  }
}
