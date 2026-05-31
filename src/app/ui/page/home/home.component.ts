import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OverviewService } from '../../../logic/service/overview/overview.service';
import { extract$ } from '../../../logic/util/utils';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public maxSize$: Observable<number>;

  constructor(
    overview: OverviewService) {
    const { chunk$ } = overview;
    this.maxSize$ = extract$(
      chunk$, 'maxSize');
  }
  
}
