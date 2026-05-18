import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CourseI } from '../../interface/CourseI';
import { foundPhrase } from '../../util/utils';

@Injectable({
  providedIn: 'root',
})
export class Filter {
  private searchSbj: BehaviorSubject<string>;
  public search$: Observable<string>;
  private topicSbj: BehaviorSubject<string>;
  public topic$: Observable<string>;

  // Definiera Rx-flödet för sökord som användaren ska mata in
  constructor() {
    this.searchSbj =
      new BehaviorSubject('');
    this.search$ = this.searchSbj
      .asObservable();
    this.topicSbj =
      new BehaviorSubject('');
    this.topic$ = this.topicSbj
      .asObservable();
  }

  // Uppdatera sökordet
  public updSearch = (
    search: string): void => {
    this.searchSbj.next(search);
  }

  // Uppatera ämnet
  public updTopic = (
    topic: string): void => {
    this.updTopic(topic);
  }

  // Returnera alla kurser som matchar det angivna sökordet
  public found = (
    search: string,
    courses: CourseI[]): CourseI[] => {
    const copy = [...courses];
    return copy.filter(
      course => this.isFound(
        search, course));
  }

  // Returnera bara kuser som matchar det angivna ämnet
  public byTopic = (
    topic: string,
    courses: CourseI[]): CourseI[] => {
    const copy = [...courses];
    return copy.filter(course => {
      const sbj = course.subject;
      return sbj === topic;
    });
  }

  // Returnera falskt eller sant om kursens kod eller namn
  // innehåller det angivna sökordet
  private isFound = (
    search: string,
    course: CourseI): boolean => {
    const { courseCode, 
      courseName } = course;
    return foundPhrase(
      courseCode, search) 
      || foundPhrase(
        courseName, 
        search);
  }
}
