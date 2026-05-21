import { Component } from '@angular/core';
import { Courses } from '../../../logic/service/courses';
import { CommonModule } from '@angular/common';
import { filter, Observable } from 'rxjs';
import { CourseI } from '../../../logic/interface/CourseI';
import { Outline } from '../../../logic/service/outline';
import { node } from '../../../logic/util/utils';
import { SortForm } from '../../component/sort-form/sort-form';
import { Sorter } from '../../../logic/service/feature/sorter';
import { FilterForm } from '../../component/filter-form/filter-form';
import { Filter } from '../../../logic/service/feature/filter';

@Component({
  selector: 'app-clist',
  imports: [CommonModule, SortForm, FilterForm],
  templateUrl: './clist.html',
  styleUrl: './clist.css',
})
export class CList {
  public courses$: Observable<CourseI[]>;
  private outline: Outline;
  public chunkLen$: Observable<number>;
  public total$: Observable<number>;
  private courses: Courses;
  public load: boolean;

  constructor(
    courses: Courses,
    outline: Outline,
    filter: Filter,
    sorter: Sorter) {
    this.courses = courses;
    this.courses$ = courses
      .chunk$(filter, sorter);
    this.outline = outline;
    this.chunkLen$ = 
      courses.chunkLen$;
    this.total$ = 
      courses.total$;
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
    this.load = this.courses
      .nextChunk();
    node(viewId)
      .scrollIntoView();
  }
}
