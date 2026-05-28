import { Component, signal } from '@angular/core';
import { NavigationStart, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NetworkService } from './logic/service/network/network.service';
import { Subscription } from 'rxjs';
import { OverviewService } from './logic/service/overview/overview.service';
import { URL } from './logic/ref/url';
import { DialogComponent } from './ui/component/dialog/dialog.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, DialogComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tslab5');
  private router: Router;
  private subs: Subscription;
  private network: NetworkService;
  private overview: OverviewService;

  constructor(
    router: Router,
    network: NetworkService,
    overview: OverviewService) {
    this.router = router;
    this.subs = new Subscription();
    this.network = network;
    this.overview = overview;
    for(let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i) || '';
      console.log(localStorage.getItem(key))
    }
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
