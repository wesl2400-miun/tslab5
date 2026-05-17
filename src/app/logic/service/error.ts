import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Error {
  private errSbj: BehaviorSubject<string>;
  public err$: Observable<string>

  constructor() {
    this.errSbj = 
      new BehaviorSubject('');
    this.err$ = this.errSbj
      .asObservable();
  }

  public update = (
    error: string): void => {
    this.errSbj.next(error);
  }
}
