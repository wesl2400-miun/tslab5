import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CourseI } from '../../interface/CourseI';

@Injectable({
  providedIn: 'root',
})
export class Counter {
  private sumSbj: BehaviorSubject<number>;
  public sum$: Observable<number>;

  constructor() {
    this.sumSbj = 
      new BehaviorSubject(0);
    this.sum$ = this.sumSbj
      .asObservable();
  }

  countPoints = (
    courses: CourseI[]) => {
    let sum: number = 0;
    courses.forEach(course =>
      sum += course.points);
    this.sumSbj.next(sum);
  }
}
