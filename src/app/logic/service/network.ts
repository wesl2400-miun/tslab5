import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Network {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public fetch = (url: string
    ): Observable<any> => {
    return this.http.get(url);
  }
}
