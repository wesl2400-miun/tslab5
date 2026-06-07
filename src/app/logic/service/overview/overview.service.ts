import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CourseI } from '../../interface/CourseI';
import { Catalog } from '../../model/Catalog';
import { Chunk } from '../../model/Chunk';

// Tjänsten för kurslistan
@Injectable({
  providedIn: 'root',
})
export class OverviewService {
  private chunkSbj: 
    BehaviorSubject<Chunk>;
  public chunk$: 
    Observable<Chunk>;
  private topicsSbj:
    BehaviorSubject<string[]>
  public topics$: 
    Observable<string[]>; 

  constructor() {;
    this.chunkSbj =
      new BehaviorSubject<Chunk>(
        new Chunk());
    this.chunk$ = this.chunkSbj
      .asObservable();
    this.topicsSbj = 
      new BehaviorSubject<string[]>([]);
    this.topics$ = 
      this.topicsSbj
        .asObservable();
  }

  // Cacha kurslistan och skapa ett kursavsnitt baserad på den
  public cache = (
    data: CourseI[]): void => {
    const catalog = 
      new Catalog(data);
    const { courses, 
      topics } = catalog;
    const chunk = 
      this.chunkSbj
      .getValue();
    chunk.init(courses);
    this.chunkSbj
      .next(chunk);
    this.topicsSbj
      .next(topics);
  }

  // Sortera kurslistan
  public sort = (
    sortMode: string): void => {
    const chunk = 
      this.chunkSbj
      .getValue();
    chunk.sort(sortMode);
    this.chunkSbj
      .next(chunk);
  }

  // Filtrera kurslistan
  public filter = (
    topic: string, 
    phrase: string): void => {
    const chunk = 
      this.chunkSbj
      .getValue();
    chunk.filter(
      topic, phrase);
    this.chunkSbj
      .next(chunk);
  }

  // Expandera kursabvsnittet (Detta är ladda-mer-funktionen)
  public expand = 
    (): boolean => {
    const chunk = 
      this.chunkSbj
      .getValue();
    chunk.expand();
    this.chunkSbj
      .next(chunk);
    return chunk.load();
  }

  // När rutten ändras nollställ kursavsnittet
  public onRoute = 
    (): void => {
    const chunk = 
      this.chunkSbj
      .getValue();
    chunk.restore();
    this.chunkSbj
      .next(chunk);
  }
}

