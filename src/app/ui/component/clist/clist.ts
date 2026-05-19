import { Component } from '@angular/core';
import { Courses } from '../../../logic/service/courses';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { CourseI } from '../../../logic/interface/CourseI';
import { Outline } from '../../../logic/service/outline';

@Component({
  selector: 'app-clist',
  imports: [CommonModule],
  templateUrl: './clist.html',
  styleUrl: './clist.css',
})
export class CList {
  public courses$: Observable<CourseI[]>;
  private outline: Outline;
  private iLenSbj: BehaviorSubject<number>;
  public itemLen$: Observable<number>;
  public total$: Observable<number>;

  constructor(
    courses: Courses,
    outline: Outline) {
    this.iLenSbj = 
      new BehaviorSubject(5);
    this.itemLen$ = this.iLenSbj
      .asObservable();
    this.courses$ = this.itemLen$
      .pipe(switchMap(itemLen => 
        courses.chunk$(itemLen)));
    this.total$ = courses.total$;
    this.outline = outline;
  }

  public addCourse = 
    (course: CourseI): void => {
    this.outline.add(course);
  }

  public changeDesc = (
    course: CourseI): void => {
    course.showMore = 
      !course.showMore;
  }

  public showBtnLab = 
    (course: CourseI): string => {
    return course.showMore
      ? 'Dölj'
      : 'Visa mer';
  }

  public nextPage = 
    (viewId: string) => {
    const len = 
      this.iLenSbj
        .getValue();
    this.iLenSbj
      .next(len + 5);
    const view = document
      .getElementById(viewId);
    view?.scrollIntoView();
  }
}
