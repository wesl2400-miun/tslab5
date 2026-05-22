import { Component, signal } from '@angular/core';
import { NavigationStart, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Network } from './logic/service/network';
import { Subscription } from 'rxjs';
import { Overview } from './logic/service/overview';
import { URL } from './logic/ref/url';

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
  private overview: Overview;

  constructor(
    router: Router,
    network: Network,
    overview: Overview) {
    this.router = router;
    this.subs = new Subscription();
    this.network = network;
    this.overview = overview;
  }

  public ngOnInit() {
    this.subs.add(this.network
      .connect(URL.COURSES,
      this.overview.cache));
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
          this.overview
            .onRoute();
        }
      })
  }
}
