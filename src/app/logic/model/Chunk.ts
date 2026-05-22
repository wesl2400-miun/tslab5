import { CourseI } from "../interface/CourseI";
import { CONSTANT } from "../ref/constant";
import { SORT_MODE } from "../ref/sortMode";
import { hasPhrase, sort } from "../util/utils";

export class Chunk {
  public maxSize: number;
  private copy: CourseI[];
  private org: CourseI[];
  public size: number;
  public chunk: CourseI[];

  constructor() {
    this.maxSize = 0;
    this.size = 
      CONSTANT.CHUNK_LEN;
    this.copy = [];
    this.org = [];
    this.chunk = [];
  }

  public init = (
    courses: CourseI[]
    ): void => {
    this.copy = courses;
    this.org = courses;
    this.maxSize = 
      courses.length;
    this.chunk = this.copy
      .slice(0, this.size);
  }

  public restore = () => {
    this.size = 
      CONSTANT.CHUNK_LEN;
    this.init(this.org);
    this.sort(SORT_MODE.CODE);
  }

  public load = 
    (): boolean =>{
    return this.size 
      < this.maxSize;
  }

  public expand = (): void => {
    const size = this.size +
      CONSTANT.CHUNK_LEN;
    if(size > this.maxSize) {
      this.size = this.maxSize;
    } else {
      this.size = size;
    }
    this.chunk = this.copy
      .slice(0, this.size);
  }

  public sort = (
    sortMode: string
  ): void => {
    this.copy = sort(
      sortMode, this.copy);
    this.chunk = this.copy
      .slice(0, this.size);
  }

  public filter = (
    topic: string, 
    phrase: string): void => {
    this.copy = this.org
      .filter(course =>
        this.findTopic(
          topic, course))
    this.chunk = this.copy
      .filter(course => 
        this.findPhrase(
          phrase, course));
  }

  private findTopic =(
    topic: string,
    course: CourseI
  ): boolean => {
    const { subject
      } = course;
    if(topic === '') {
      return true;
    } else {
      const found =
        subject === topic;
      return found;
    }
  }

  private findPhrase = (
    phrase: string,
    course: CourseI
  ): boolean => {
    if(phrase === '')
      return true;
    const { courseCode, 
      courseName} = course;
    return hasPhrase(
      courseCode, phrase) 
      || hasPhrase(
        courseName, phrase); 
  }
}