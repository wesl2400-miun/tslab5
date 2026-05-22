import { CourseI } from "../interface/CourseI";

export class Catalog {
  public courses: CourseI[];
  public topics: string[];

  constructor(
    courses: CourseI[]) {
    const { unique, topics } = 
      this.clean(courses);
    this.courses = unique;
    this.topics = topics;
  }

  private clean = (
    courses: CourseI[]
    ): any => {
    const ids: Set<string>
      = new Set();
    const topics: 
      Set<string> = new Set();
    const unique: 
      CourseI[] = [];
    courses.forEach(course => {
      this.cleanItem(
        ids, unique, 
        topics, course);
    });
    return { unique,
      topics: Array
      .from(topics)
    }
  }

  private cleanItem = (
    ids: Set<string>,
    unique: CourseI[],
    topics: Set<string>,
    course: CourseI,
  ): void => {
    const name =
      course.courseName;
    const code = 
      course.courseCode;
    const topic =
      course.subject;
    const valid = !ids.has(code) 
      && name !== 'Okänt namn';
    if(valid) {
      ids.add(code);
      unique.push(
        course);
      topics.add(topic);
    }
  }
}