import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Total {
  private maxSbj: BehaviorSubject<number>;
  public max$: Observable<number>;
  private currSbj: BehaviorSubject<number>;
  public current$: Observable<number>;

  constructor() {
    this.maxSbj = 
      new BehaviorSubject(0);
    this.max$ = this.maxSbj
      .asObservable();
    this.currSbj =
      new BehaviorSubject(0);
    this.current$ = 
      this.currSbj
      .asObservable();
  }

  public updateMax = (
    max: number): void => {
    this.maxSbj.next(max);
  }

  public updateCurr = (
    curr: number) => {
    this.currSbj.next(curr);
  }
}
