import { CourseI } from "./CourseI";

export interface UserI {
  fName: string,
  lName: string,
  email: string,
  pass: string,
  courses: CourseI[],
}