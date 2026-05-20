import { Component } from '@angular/core';
import { Courses } from '../../../logic/service/courses';
import { CommonModule } from '@angular/common';
import { combineLatest, Observable, map } from 'rxjs';
import { CourseI } from '../../../logic/interface/CourseI';
import { Outline } from '../../../logic/service/outline';
import { node } from '../../../logic/util/utils';
import { SortForm } from '../../component/sort-form/sort-form';
import { Sorter } from '../../../logic/service/feature/sorter';

@Component({
  selector: 'app-clist',
  imports: [CommonModule, SortForm],
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
    sorter: Sorter) {
    this.courses = courses;
    this.courses$ = courses
      .chunk$(sorter, 
        sorter.sortMode$);
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
