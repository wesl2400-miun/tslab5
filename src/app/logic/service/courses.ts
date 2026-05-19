import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
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
  private totalSbj: BehaviorSubject<number>;
  public total$: Observable<number>;

  constructor(error: Error) {
    this.error = error;
    this.cacheSbj = 
      new BehaviorSubject<CourseI[]>([]);
    this.totalSbj =
      new BehaviorSubject<number>(0);
    this.total$ = this.totalSbj
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
    console.log(courses);
    this.cacheSbj
      .next(courses);
    this.totalSbj.next(
      courses.length);
  }

  public chunk$ = (
    end: number): Observable<CourseI[]> => {
    return this.cacheSbj
      .asObservable()
      .pipe(map((courses) => {
      return courses.slice(0, end);
    }));
  }
}
