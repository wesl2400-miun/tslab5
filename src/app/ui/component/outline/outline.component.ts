import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseI } from '../../../logic/interface/CourseI';
import { OutlineService } from '../../../logic/service/outline/outline.service';
import { extract$ } from '../../../logic/util/utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-outline',
  imports: [CommonModule],
  templateUrl: './outline.component.html',
  styleUrl: './outline.component.css',
})
export class OutlineComponent {
  public chosen$: Observable<CourseI[]>;
  public size$: Observable<number>;
  public points$: Observable<number>;
  private outline: OutlineService;

  constructor(
    outline: OutlineService) {
    this.outline = outline;
    const { schedule$ 
      } = outline;
    this.chosen$ = extract$(
      schedule$, 'chosen');
    this.size$ = extract$(
      schedule$, 'getSize', true);
    this.points$ = extract$(
      schedule$, 'points', true);
  }

  public remCourse = (
    course: CourseI
    ): void => {
    this.outline
      .remCourse(
        course);
  }
}
