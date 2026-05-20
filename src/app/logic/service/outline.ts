import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CourseI } from '../interface/CourseI';
import { Error } from './error';
import { ERR_MSG } from '../ref/errMsg';
import { load, save } from '../util/utils';
import { STORAGE } from '../ref/storage';

@Injectable({
  providedIn: 'root',
})
export class Outline {
  private error: Error;
  private pickSbj: BehaviorSubject<CourseI[]>;
  public picked$: Observable<CourseI[]>;
  
  constructor(error: Error) {
    this.pickSbj = 
      new BehaviorSubject<CourseI[]>([]);
    this.picked$ = this.pickSbj
      .asObservable();
    this.error = error;
    this.tryLoad();
  }

  public add = (
    newCour: CourseI): void => {
    const courses = 
      this.pickSbj.getValue();
    const duplicate: boolean = 
      this.isDuplicate(
        courses, newCour);
    if(duplicate) {
      this.error.update(
        ERR_MSG.DUPLICATE);
      return;
    } else {
      newCour.added = true;
      const copy = 
        [...courses, newCour];
      this.trySave(copy);
    }
  }

  public remove = (
    remCourse: CourseI): void => {
    const courses =
      this.pickSbj.getValue();
    const copy = courses
      .filter(course => {
        const a = course
          .courseCode;
        const b = remCourse
          .courseCode;
        return a !== b;
      });
    this.trySave(copy);
    remCourse.added = false;
  }

  private isDuplicate = (
    courses: CourseI[],
    newCour: CourseI
  ): boolean => {
    return courses
      .some(course => {
        const a = course
          .courseCode;
        const b = newCour
          .courseCode;
        return a === b;
      });
  }

  private trySave = (
    copy: CourseI[]): void => {
    try {
      save(STORAGE.OUTLINE, copy);
      this.pickSbj.next(copy);
    } catch(err: any) {
      console.error(err.message);
      this.error.update(
        ERR_MSG.SAVE_FAIL);
    }
  }

  private tryLoad = (): void => {
    try {
      const stored: any  = load(
        STORAGE.OUTLINE) 
        || [] as CourseI[];
      if(stored) {
        this.pickSbj
          .next(stored);
      }
    } catch(err: any) {
      console.error(
        err.message);
      this.error.update(
        ERR_MSG.LOAD_FAIL);
    }
  }
}
