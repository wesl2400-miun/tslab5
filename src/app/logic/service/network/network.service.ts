import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private http: HttpClient;

  constructor(
    http: HttpClient) {
    this.http = http;
  }

  public connect = (
    url: string, onConnect: 
    (data: any) => void
  ): Subscription => {
    return this.http.get(url)
      .subscribe({
        next: (data: any) => 
          onConnect(data),
        error: (err: any) => 
          this.onError(err)
      });
  }

  private onError = (
    err: any) => {
    console.error(
      err.message);
  }
}
