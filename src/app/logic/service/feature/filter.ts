import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CourseI } from '../../interface/CourseI';
import { hasPhrase } from '../../util/utils';

@Injectable({
  providedIn: 'root',
})
export class Filter {
  private phraseSbj: BehaviorSubject<string>;
  public phrase$: Observable<string>;

  // Definiera Rx-flödet för sökord som användaren ska mata in
  constructor() {
    this.phraseSbj =
      new BehaviorSubject('');
    this.phrase$ = this.phraseSbj
      .asObservable();
  }

  public reset = (): void => {
    this.phraseSbj.next('');
  }

  // Uppdatera sökordet
  public update = (
    phrase: string): void => {
    this.phraseSbj
      .next(phrase);
  }

  // Returnera alla kurser som matchar det angivna sökordet
  public filtered = (
    phrase: string,
    courses: CourseI[]): CourseI[] => {
    if(phrase === '') 
      return courses;
    const copy = [...courses];
    return copy.filter(
      course => this.isFound(
        phrase, course));
  }

  // Returnera falskt eller sant om kursens kod eller namn
  // innehåller det angivna sökordet
  private isFound = (
    phrase: string,
    course: CourseI): boolean => {
    const { courseCode, 
      courseName, 
      subject } = course;
    const found = hasPhrase(
      courseCode, phrase) 
      || hasPhrase(
        courseName, phrase)
      || subject === phrase;
    return found;
  }
}
