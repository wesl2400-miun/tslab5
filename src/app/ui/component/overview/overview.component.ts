import { Component } from '@angular/core';
import { OverviewService } from '../../../logic/service/overview/overview.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CourseI } from '../../../logic/interface/CourseI';
import { extract$, node } from '../../../logic/util/utils';
import { DashboardService } from '../../../logic/service/dashboard/dashboard.service';

// UI-logiken för kurslistan
@Component({
  selector: 'app-overview',
  imports: [CommonModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent {
  private dashboard: DashboardService;
  private overview: OverviewService;
  public size$: Observable<number>;
  public maxSize$: Observable<number>;
  public chunk$: Observable<CourseI[]>;
  public load: boolean;

  constructor(
    overview:OverviewService,
    dashboard: DashboardService
  ) {
    this.dashboard = dashboard;
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

  // Hindra kursen från att läggas i ramschemat
  public hideCourse = 
    (code: string): boolean => {
    return this.dashboard
      .hasCourse(code) 
      || !this.dashboard.logged();
  }

  // Lägg till kursen till ramschemat
  public addCourse = (
    course: CourseI
    ): void => {
    this.dashboard
      .addCourse(course);
  }

  // Ändra kursbeskrivningen
  public changeDesc = (
    course: CourseI): void => {
    course.showMore = 
      !course.showMore;
  }

  // Visa respektive dölj den långa beskrviningen av en kurs
  public showBtnLab = 
    (course: CourseI): string => {
    return course.showMore
      ? 'Dölj'
      : 'Visa mer';
  }

  // Ladda mer kurser
  public loadMore = 
    (viewId: string) => {
    this.load = 
      this.overview
        .expand();
    node(viewId)
      .scrollIntoView();
  }
}

