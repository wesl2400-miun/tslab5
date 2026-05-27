import { Injectable } from '@angular/core';
import { Schedule } from '../../model/Schedule';
import { CourseI } from '../../interface/CourseI';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserI } from '../../interface/UserI';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private schedule: Schedule;
  private userSbj: BehaviorSubject<UserI | null>;
  public user$: Observable<UserI | null>;

  constructor() {
    this.schedule = 
      new Schedule();
    this.userSbj = 
      new BehaviorSubject<
        UserI | null>(null);
    this.user$ = this.userSbj
      .asObservable();
  }

  public update = (
    user: UserI | null
    ): void => {
    this.userSbj
      .next(user);
  }

  public hasCourse = (
    code: string
    ): boolean => {
    const user: UserI | null
     = this.userSbj
      .getValue();
    return this.schedule
      .hasCourse(
        code, user);
  }

  public points = (): number => {
    const user: UserI | null
     = this.userSbj
      .getValue();
    return this.schedule
      .points(user);
  }

  public total = 
    (): number => {
    const user: UserI | null
     = this.userSbj
      .getValue();
    return user
      ?.courses
      .length || 0;
  }

  public logout = 
    (): void => {
    this.userSbj
      .next(null);
  }

  public logged = 
    (): boolean => {
    const user: UserI | null
     = this.userSbj
      .getValue();
    return user !== null;
  }
  
  public addCourse = (
    newCour: CourseI
    ): void => {
    const user: UserI | null
     = this.userSbj
      .getValue();
    const updated = 
      this.schedule
      .add(newCour, user);
    this.update(updated);
  }

  public remCourse = (
    code: string): void => {
    const user: UserI | null
     = this.userSbj
      .getValue();
    const updated = 
      this.schedule
      .remove(code, user);
    this.update(updated);
  }
}
