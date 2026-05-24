import { CourseI } from "../interface/CourseI";
import { CONSTANT } from "../ref/constant";
import { Effects } from "./Effects";

export class Chunk {
  public maxSize: number;
  private copy: CourseI[];
  public size: number;
  private effs: Effects | null;

  constructor() {
    this.maxSize = 0;
    this.size = 0;
    this.copy = [];
    this.effs = null;
  }

  public chunk = 
    (): CourseI[] => { 
    return this.effs!
      .applyTo(this.copy)
      .slice(0, this.size);
  }

  public init = (
    courses: CourseI[]
    ): void => {
    this.maxSize = 
      courses.length;
    this.copy = courses;
    this.size = 
      CONSTANT.CHUNK_LEN;
    this.effs = new Effects();
  }

  public restore = () => {
    this.size = 
      CONSTANT.CHUNK_LEN;
    this.init(this.copy);
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
  }

  public sort = (
    sortMode: string
  ): void => {
    this.effs?.sortOn(
      sortMode);
  }

  public filter = (
    topic: string, 
    phrase: string
    ): void => {
    this.effs
      ?.topicOn(
        topic);
    this.effs
      ?.phraseOn(
        phrase);
  }

}