import { CourseI } from "../interface/CourseI";
import { STORAGE } from "../ref/storage";
import { load, save } from "../util/utils";

export class Schedule {
  public chosen: CourseI[];
  private added: Set<string>;
  
  constructor() {
    this.chosen = [];
    this.added = 
      new Set();
  }

  public getSize = 
    (): number => {
    return this.chosen
      .length;
  }

  public hasCourse = (
    code: string
    ): boolean => {
    return this.added
      .has(code);
  }

  public init = 
    (): void => {
    this.tryLoad();
    this.chosen.forEach(
      course => {
      const { courseCode 
        } = course;
      this.added.add(
        courseCode);
    })
  }

  public points = 
    (): number => {
    let sum = 0;
    this.chosen.forEach(
      course => {
      sum += course.points;
    });
    return sum;
  }

  public add = (
    course: CourseI
    ): void => {
    const duplicate: boolean = 
      this.isDuplicate(
        this.chosen, course);
    if(!duplicate) {
      const copy = 
        [...this.chosen, 
          course];
      this.trySave(copy);
      const { courseCode 
        } = course;
      this.added.add(
        courseCode);
    }
  }

  public remove = (
    course: CourseI
    ): void => {
    const { courseCode 
      } = course;
    const copy = this.chosen
      .filter(c => {
        return courseCode 
          !== c.courseCode;
      });
    this.trySave(copy);
    this.added.delete(
      courseCode);
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
  
  private tryLoad = 
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