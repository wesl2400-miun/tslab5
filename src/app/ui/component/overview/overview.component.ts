import { Component } from '@angular/core';
import { OverviewService } from '../../../logic/service/overview/overview.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CourseI } from '../../../logic/interface/CourseI';
import { OutlineService } from '../../../logic/service/outline/outline.service';
import { extract$, node } from '../../../logic/util/utils';

@Component({
  selector: 'app-overview',
  imports: [CommonModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent {
  private outline: OutlineService;
  private overview: OverviewService;
  public size$: Observable<number>;
  public maxSize$: Observable<number>;
  public chunk$: Observable<CourseI[]>;
  public load: boolean;

  constructor(
    overview:OverviewService,
    outline: OutlineService
  ) {
    this.outline = outline;
    this.overview = overview;
    const { chunk$ } = overview;
    this.chunk$ =  extract$(
      chunk$, 'chunk', true);
    this.size$ = extract$(
      chunk$, 'getSize', true);
    this.maxSize$ = extract$(
      chunk$, 'maxSize');
    this.load = true;
  }

  public hideCourse = 
    (code: string): boolean => {
    return this.outline
      .hasCourse(code);
  }

  public addCourse = (
    course: CourseI
    ): void => {
    this.outline
      .addCourse(course);
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

