import { CourseI } from "../interface/CourseI";
import { CONSTANT } from "../ref/constant";
import { Effects } from "./Effects";

// Hanterar ett avsnitt av kurslistan som laddas upp med 'ladda mer'-knappen
export class Chunk {
  public maxSize: number;
  private copy: CourseI[];
  private size: number;
  private effs: Effects | null;

  constructor() {
    this.maxSize = 0;
    this.size = 0;
    this.copy = [];
    this.effs = null;
  }

  // Applicerar effekter på ett avsnitt av kurslistan
  public chunk = 
    (): CourseI[] => { 
    return this.effs!
      .applyTo(this.copy)
      .slice(0, this.size);
  }

  // Returnera den nuvarande längden på avsnittet av kurslistan
  public getSize = 
    (): number => {
    return this.chunk()
      .length;
  }

  // Initiera data som är nödvänding för att förbereda ett aktuellt avsnitt av kurslistan
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

  // Nollställ avsnittlängden och alla nödvändiga värden
  public restore = () => {
    this.size = 
      CONSTANT.CHUNK_LEN;
    this.init(this.copy);
  }

  // Kolla om mer kurser kan laddas
  public load = 
    (): boolean =>{
    return this.size 
      < this.maxSize;
  }

  // Expandera kursavsnittet
  public expand = (): void => {
    const size = this.size +
      CONSTANT.CHUNK_LEN;
    if(size > this.maxSize) {
      this.size = this.maxSize;
    } else {
      this.size = size;
    }
  }

  // Sortera kursavsnittet
  public sort = (
    sortMode: string
  ): void => {
    this.effs?.sortOn(
      sortMode);
    this.size = 
      CONSTANT.CHUNK_LEN;
  }

  // Filtrera kursavsnittet
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
    this.size = 
      CONSTANT.CHUNK_LEN;
  }
}