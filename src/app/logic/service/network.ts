import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { onError } from '../util/utils';

@Injectable({
  providedIn: 'root',
})
export class Network {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public fetch = (
    sbj: BehaviorSubject<any>,
    url: string,
    ): Subscription => {
    return this.http
      .get(url).subscribe({ 
        next: (data): void => 
          sbj.next(data),
        error: onError
      });
  }
}
