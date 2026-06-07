import { CourseI } from "./CourseI";

// Strukturen för användardata
export interface UserI {
  fName: string,
  lName: string,
  email: string,
  pass: string,
  courses: CourseI[],
}