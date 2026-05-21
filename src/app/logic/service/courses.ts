import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, switchMap } from 'rxjs';
import { Error } from './error';
import { CourseI } from '../interface/CourseI';
import { Network } from './network';
import { URL } from '../ref/url';
import { Subscription } from 'rxjs';
import { ERR_MSG } from '../ref/errMsg';
import { CONSTANT } from '../ref/constant';
import { Sorter } from './feature/sorter';
import { Filter } from './feature/filter';

@Injectable({
  providedIn: 'root',
})
export class Courses {
  private error: Error;
  private cacheSbj: BehaviorSubject<CourseI[]>;
  private cache$: Observable<CourseI[]>;
  private totalSbj: BehaviorSubject<number>;
  public total$: Observable<number>;
  private chunkLenSbj: BehaviorSubject<number>;
  public chunkLen$: Observable<number>;
  private topSbj: BehaviorSubject<string[]>;
  public topics$: Observable<string[]>;

  constructor(error: Error) {
    this.error = error;
    this.cacheSbj = 
      new BehaviorSubject<CourseI[]>([]);
    this.cache$ = this.cacheSbj
      .asObservable();
    this.totalSbj =
      new BehaviorSubject<number>(0);
    this.total$ = this.totalSbj
      .asObservable();
    this.chunkLenSbj = 
      new BehaviorSubject(
        CONSTANT.CHUNK_LEN);
    this.chunkLen$ = this.chunkLenSbj
      .asObservable();
    this.topSbj = 
      new BehaviorSubject<string[]>([]);
    this.topics$ = this.topSbj
      .asObservable();
  }

  public fetch = (
    network: Network
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
    const unique = 
      this.remDups(courses);
    this.cacheSbj.next(unique);
    this.totalSbj.next(
      unique.length);
  }

  private remDups = (
    courses: CourseI[]): CourseI[] => {
    const ids: 
      Set<string> = new Set();
    const unique: 
      CourseI[] = [];
    const len = courses.length;
    const topics: 
      Set<string> = new Set();
    for(let i = 0; i < len; i++) {
      const course = courses[i];
      const code = 
        course.courseCode;
      const name =
        course.courseName;
      topics.add(
        course.subject);
      if(!ids.has(code)) {
        ids.add(code);
        if(name !== 'Okänt namn')
          unique.push(course);
      } 
    }
    this.topSbj.next(
      Array.from(topics));
    return unique;
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

  public chunk$ = (
    filter: Filter,
    sorter: Sorter,
    ): Observable<CourseI[]> => {
    return this.chunkLen$
      .pipe(switchMap(len => {
      return combineLatest([
          this.cache$, 
          filter.phrase$,
          sorter.sortMode$
        ])
        .pipe(map(([
          courses, phrase, 
          sortMode]) => {
          const filtered = 
            filter.filtered(
              phrase, courses);
          const sorted = sorter
            .sorted(sortMode, 
              filtered); 
          return sorted
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
