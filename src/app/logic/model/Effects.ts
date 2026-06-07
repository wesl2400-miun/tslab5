import { CourseI } from "../interface/CourseI";
import { SORT_MODE } from "../ref/sortMode";
import { hasPhrase, sort } from "../util/utils";

// Hanterar filterings och sorteringseffekter
export class Effects {

  private phrase: string;
  private topic: string;
  private sortMode: string;

  constructor() {
    this.phrase = '';
    this.topic = '';
    this.sortMode = 
      SORT_MODE.CODE;
  }

  // Sätt på frasfiltrering
  public phraseOn = (
    phrase: string): void => {
    this.phrase = phrase;
  }

  // Sätt på ämnefiltrering
  public topicOn = (
    topic: string): void => {
    this.topic = topic;
  }

  // Sätt på sortering
  public sortOn = (
    sortMode: string) => {
    this.sortMode = sortMode;
  }
  
  // Applicera effekterna på den angivna kurslistan
  public applyTo = (
    courses: CourseI[]
    ): CourseI[] => {
    const copy: 
      CourseI[] = [];
    courses.forEach(
      course => this.affect(
        course, copy));
    const sorted =  sort(
      this.sortMode, copy);
    return sorted;
  }

  // Låt effekterna påverka den agivna kursen
  private affect = (
    course: CourseI,
    copy: CourseI[],
    ): void => {
    const { courseCode, 
      courseName, 
      subject } = course;
    const topic: boolean = 
      subject === this.topic
      || this.topic === '';
    if(topic) {
      const found: boolean
        = hasPhrase(
          courseCode, 
          this.phrase) 
        || hasPhrase(
          courseName, 
          this.phrase) 
        || this.phrase === '';
      if(found) copy
        .push(course);
    }
  }
}