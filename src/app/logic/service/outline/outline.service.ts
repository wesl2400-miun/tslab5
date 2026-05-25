import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Schedule } from '../../model/Schedule';
import { CourseI } from '../../interface/CourseI';

@Injectable({
  providedIn: 'root',
})
export class OutlineService {
  private schedSbj: BehaviorSubject<Schedule>;
  public schedule$: Observable<Schedule>;

  constructor() {
    const schedule = 
      new Schedule();
    schedule.init();
    this.schedSbj = 
      new BehaviorSubject(
        schedule);
    this.schedule$ = this.schedSbj
      .asObservable();
  }

  public hasCourse = (
    code: string): boolean => {
    const schedule = 
      this.schedSbj
        .getValue();
    return schedule
      .hasCourse(code);
  }

  public addCourse = (
    course: CourseI): void => {
    const schedule = 
      this.schedSbj
        .getValue();
    schedule.add(course);
    this.schedSbj.next(
      schedule);
  }

  public remCourse = (
    course: CourseI): void => {
    const schedule = 
      this.schedSbj
        .getValue();
    schedule.remove(
      course);
    this.schedSbj.next(
      schedule);
  }
}
