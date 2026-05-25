import { CourseI } from "../interface/CourseI";
import { STORAGE } from "../ref/storage";
import { load, save } from "../util/utils";

export class Schedule {
  private chosen: CourseI[];
  
  constructor() {
    this.chosen = [];
  }

  public add = (
    newCour: CourseI
    ): void => {
    const duplicate: boolean = 
      this.isDuplicate(
        this.chosen, newCour);
    if(!duplicate) {
      newCour.added = true;
      const copy = 
        [...this.chosen, 
          newCour];
      this.trySave(copy);
    }
  }

  public remove = (
    remCourse: CourseI
    ): void => {
    const copy = this.chosen
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
    copy: CourseI[]
    ): void => {
    try {
      save(STORAGE
        .SCHEDULE, copy);
      this.chosen = copy;
    } catch(err: any) {
        console.error(
          err.message);
    }
  }
  
  public tryLoad = 
    (): void => {
    try {
      const stored: any = 
        load(STORAGE
          .SCHEDULE)
        || [] as CourseI[];
      if(stored) {
        this.chosen = 
          stored;
      }
    } catch(err: any) {
      console.error(
        err.message);
    }
  }
}