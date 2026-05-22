import { Component } from '@angular/core';
import { Overview } from '../../../logic/service/overview';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CourseI } from '../../../logic/interface/CourseI';
import { Outline } from '../../../logic/service/outline';
import { extract$, node } from '../../../logic/util/utils';
import { SortForm } from '../../component/sort-form/sort-form';
import { FilterForm } from '../../component/filter-form/filter-form';

@Component({
  selector: 'app-clist',
  imports: [CommonModule, SortForm, FilterForm],
  templateUrl: './clist.html',
  styleUrl: './clist.css',
})
export class CList {
  private outline: Outline;
  private overview: Overview;
  public size$: Observable<number>;
  public maxSize$: Observable<number>;
  public chunk$: Observable<CourseI[]>;
  public load: boolean;

  constructor(
    overview:Overview,
    outline: Outline
  ) {
    this.outline = outline;
    this.overview = overview;
    const { chunk$ } = overview;
    this.chunk$ = extract$(
      chunk$, 'chunk');
    this.size$ = extract$(
      chunk$, 'size');
    this.maxSize$ = extract$(
      chunk$, 'maxSize');
    this.load = true;
  }

  public addCourse = 
    (course: CourseI): void => {
    this.outline.add(course);
  }

  public changeDesc = (
    course: CourseI): void => {
    course.showMore = 
      !course.showMore;
  }

  public showBtnLab = 
    (course: CourseI): string => {
    return course.showMore
      ? 'Dölj'
      : 'Visa mer';
  }

  public loadMore = 
    (viewId: string) => {
    this.load = 
      this.overview
        .expand();
    node(viewId)
      .scrollIntoView();
  }
}
