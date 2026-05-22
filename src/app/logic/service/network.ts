import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { ERR_MSG } from '../ref/errMsg';
import { Error } from './error';

@Injectable({
  providedIn: 'root',
})
export class Network {
  private http: HttpClient;
  private error: Error;

  constructor(
    http: HttpClient, 
    error: Error) {
    this.http = http;
    this.error = error;
  }

  public connect = (
    url: string, onConnect: 
    (data: any) => void
  ): Subscription => {
    return this.http.get(url)
      .subscribe({
        next: (data) => 
          onConnect(data),
        error: this.onError
      });
  }

  private onError = () => {
    this.error.update(
      ERR_MSG.NETWORK_FAIL);
  }
}
