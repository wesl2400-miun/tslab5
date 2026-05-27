import { CourseI } from "../interface/CourseI";
import { UserI } from "../interface/UserI";
import { load, save } from "../util/utils";

export class Schedule {

  public upload = (
    email: string
    ): UserI | null => {
    return this.tryLoad(email);
  }

  public hasCourse = (
    code: string,
    user: UserI | null
    ): boolean => {
    return user?.courses
      .some(c => c.courseCode 
        === code) as boolean;
  }

  public points = (
    user: UserI | null
    ): number => {
    let sum = 0;
    user?.courses.forEach(
      course => {
      sum += course.points;
    });
    return sum;
  }

  public add = (
    newCour: CourseI,
    user: UserI | null
    ): UserI | null => {
    if(!user) 
      return null;
    const { email, 
      courses } = user;
    courses.push(
      newCour);
    this.trySave(
      email, user);
    return user;
  }

  public remove = (
    code: string,
    user: UserI | null
    ): UserI | null => {
    if(!user) 
      return null;
    const { email, 
      courses } = user;
    const copy = courses
      .filter(c => 
        c.courseCode 
        !== code);
    user.courses = copy;
    this.trySave(
      email, user);
    return user;
  }

  private trySave = (
    email: string,
    user: UserI) => {
    try {
      save(email, user);
    } catch(err: any) {
        console.error(
          err.message);
    }
  }
  
  private tryLoad = (
    email: string
    ): UserI | null => {
    try {
      return load(email);
    } catch(err: any) {
      console.error(
        err.message);
      return null;
    }
  }
}