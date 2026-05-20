import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, switchMap } from 'rxjs';
import { Error } from './error';
import { CourseI } from '../interface/CourseI';
import { Network } from './network';
import { URL } from '../ref/url';
import { Subscription } from 'rxjs';
import { ERR_MSG } from '../ref/errMsg';
import { CONSTANT } from '../ref/constant';

@Injectable({
  providedIn: 'root',
})
export class Courses {
  private error: Error;
  private cacheSbj: BehaviorSubject<CourseI[]>;
  public current$: Observable<CourseI[]>;
  private totalSbj: BehaviorSubject<number>;
  public total$: Observable<number>;
  private chunkLenSbj: BehaviorSubject<number>;
  public chunkLen$: Observable<number>;

  constructor(error: Error) {
    this.error = error;
    this.cacheSbj = 
      new BehaviorSubject<CourseI[]>([]);
    this.totalSbj =
      new BehaviorSubject<number>(0);
    this.total$ = this.totalSbj
      .asObservable();
    this.chunkLenSbj = 
      new BehaviorSubject(
        CONSTANT.CHUNK_LEN);
    this.chunkLen$ = this.chunkLenSbj
      .asObservable();
    this.current$ = this.chunk$();
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

  public nextChunk = (): boolean => {
    const len = this.chunkLenSbj
      .getValue();
    const total = this.totalSbj
      .getValue();
    let load = false;
    if(len < total) {
      let chunk = len + 
        CONSTANT.CHUNK_LEN;
      load = true;
      if(chunk > total) {
        load = false;
        chunk = total;
      }
      this.chunkLenSbj
        .next(chunk);
    } 
    return load;
  }

  private chunk$ = (
    ): Observable<CourseI[]> => {
    return this.chunkLen$
      .pipe(switchMap(len => {
      return this.cacheSbj
        .asObservable()
        .pipe(map(courses => {
          return courses
            .slice(0, len);
        }));
    }));
  }

  public onRoute = 
    (): void => {
    this.chunkLenSbj.next(
      CONSTANT.CHUNK_LEN);
  }
}
