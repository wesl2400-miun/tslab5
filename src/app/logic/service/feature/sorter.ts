import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SORT_MODE } from '../../ref/sortMode';
import { CourseI } from '../../interface/CourseI';

@Injectable({
  providedIn: 'root',
})
export class Sorter {
  private sortSbj: BehaviorSubject<string>
  public sortMode$: Observable<string>

  // Definiera Rx-flödet för sorteringsflaggan
  constructor() {
    this.sortSbj = 
      new BehaviorSubject(
        SORT_MODE.CODE);
    this.sortMode$ = 
      this.sortSbj
        .asObservable();
  }

  // Uppdatera sorteringsflaggan
  public sort = (
    sortMode: string) => {
    this.sortSbj
      .next(sortMode);
  }

  // Returnera en sorterad kurslista
  public sorted = (
    sortMode: string,
    courses: CourseI[]
    ): CourseI[] => {
    const copy = [...courses];
    return this.sortedBy(
      copy, sortMode); 
  }

  // Sortera kurserna efter den agivna flaggan 
  // (egentligen efter objektets fält som anges här dynamiskt)
  private sortedBy = (
    courses: CourseI[],
    field: string): CourseI[] => {
    const compare = (a: CourseI, 
      b: CourseI): number => {
      const prop = field as 
        keyof CourseI;
      if(a[prop] > b[prop]) 
        return 1;
      else if(a[prop] < b[prop])
        return -1;
      return 0;
    }
    return courses
      .sort(compare);
  }
}
