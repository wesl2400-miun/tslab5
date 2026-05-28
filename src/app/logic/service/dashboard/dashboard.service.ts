import { Injectable } from '@angular/core';
import { Schedule } from '../../model/Schedule';
import { CourseI } from '../../interface/CourseI';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserI } from '../../interface/UserI';
import { DialogService } from '../dialog/dialog.service';
import { DIALOG } from '../../ref/dialog';
import { Message } from '../../model/Message';
import { CSS_CLASS } from '../../ref/cssClass';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private schedule: Schedule;
  private userSbj: BehaviorSubject<UserI | null>;
  public user$: Observable<UserI | null>;
  private dialog: DialogService;

  constructor(
    dialog: DialogService) {
    this.schedule = 
      new Schedule();
    this.userSbj = 
      new BehaviorSubject<
        UserI | null>(null);
    this.user$ = this.userSbj
      .asObservable();
    this.dialog = dialog;
  }

  public update = (
    user: UserI | null
    ): void => {
    this.userSbj
      .next(user);
  }

  private get user
    (): UserI | null {
    return this.userSbj
      .getValue();
  }

  public hasCourse = (
    code: string
    ): boolean => {
    const user: UserI | null
     = this.user;
    return this.schedule
      .hasCourse(
        code, user);
  }

  public points = (): number => {
    const user: UserI | null
     = this.user;
    return this.schedule
      .points(user);
  }

  public total = 
    (): number => {
    const user: UserI | null
     = this.user;
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
     = this.user;
    return user !== null;
  }
  
  public addCourse = (
    newCour: CourseI
    ): void => {
    const user: UserI | null
     = this.user;
    const updated = 
      this.schedule
      .add(newCour, user);
    let msg: Message = 
      new Message(DIALOG
        .ADD_CRS_SUCCESS);
    if(!updated)
      msg = new Message(
        DIALOG.ADD_CRS_FAIL,
        CSS_CLASS.DIAG_ERR);
    this.dialog
      .update(msg);
    this.update(updated);
  }

  public remCourse = (
    code: string): void => {
    const user: UserI | null
     = this.user;
    const updated = 
      this.schedule
      .remove(code, user);
    let msg: Message = 
      new Message(DIALOG
        .REM_CRS_SUCCESS);
    if(!updated)
      msg = new Message(
        DIALOG.REM_CRS_FAIL, 
        CSS_CLASS.DIAG_ERR);
    this.dialog
      .update(msg);
    this.update(updated);
  }
}
