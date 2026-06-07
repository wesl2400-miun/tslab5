import { CourseI } from "../interface/CourseI";
import { UserI } from "../interface/UserI";

// Modellkassen för användare
export class User 
  implements UserI {

  constructor(
    public fName: string = '', 
    public lName: string = '', 
    public email: string = '', 
    public pass: string = '',
    public courses: CourseI[] = []
  ) {
    this.fName = fName;
    this.lName = lName;
    this.email = email;
    this.pass = pass;
    this.courses = courses;
  }
}