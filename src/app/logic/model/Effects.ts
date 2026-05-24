import { CourseI } from "../interface/CourseI";
import { SORT_MODE } from "../ref/sortMode";
import { hasPhrase, sort } from "../util/utils";

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

  public phraseOn = (
    phrase: string): void => {
    this.phrase = phrase;
  }

  public topicOn = (
    topic: string): void => {
    this.topic = topic;
  }

  public sortOn = (
    sortMode: string) => {
    this.sortMode = sortMode;
  }
  
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