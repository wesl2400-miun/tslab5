import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Error } from './error';
import { CourseI } from '../interface/CourseI';
import { Network } from './network';
import { URL } from '../ref/url';
import { Subscription } from 'rxjs';
import { ERR_MSG } from '../ref/errMsg';

@Injectable({
  providedIn: 'root',
})
export class Courses {
  private error: Error;
  private cacheSbj: BehaviorSubject<CourseI[]>;
  public cache$: Observable<CourseI[]>;

  constructor(error: Error) {
    this.error = error;
    this.cacheSbj = 
      new BehaviorSubject<CourseI[]>([]);
    this.cache$ = this.cacheSbj
      .asObservable();
  }

  public fetch = (network: Network
    ): Subscription => {
    return network
      .fetch(URL.COURSES)
      .subscribe({
        next: this.cache,
        error: () => {
          this.error.update(
            ERR_MSG.NETWORK_FAIL);
        }
      });
  }

  private cache = (
    courses: CourseI[]): void => {
    this.cacheSbj
      .next(courses);
  }
}
