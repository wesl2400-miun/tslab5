import { CourseI } from "../interface/CourseI";

export class Course 
  implements CourseI {

  constructor(
    public courseCode: string,
    public subjectCode: string,
    public level: string,
    public progression: string,
    public courseName: string,
    public points: number,
    public institutionCode: string,
    public subject: string,
    public syllabus: string,
    public showMore: boolean,
  ) {
    this.courseCode = courseCode;
    this.subjectCode = subjectCode;
    this.level = level;
    this.progression = progression;
    this.courseName = courseName;
    this.points = points;
    this.institutionCode = institutionCode;
    this.subject = subject;
    this.syllabus = syllabus;
    this.showMore = false;
  }
}