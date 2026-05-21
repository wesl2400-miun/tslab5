import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Filter } from '../../../logic/service/feature/filter';
import { Courses } from '../../../logic/service/courses';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './filter-form.html',
  styleUrl: './filter-form.css',
})
export class FilterForm {
  public form: FormGroup;
  private subs: Subscription;
  private filter: Filter;
  public topics$: Observable<string[]>;

  // Initiera formuläret och data
  constructor(
    fBuilder: FormBuilder,
    filter: Filter,
    courses: Courses) {
    this.form = fBuilder.group({
      search: [''],
      topic: ['']
    });
    this.subs = new Subscription();
    this.filter = filter;
    this.topics$ = courses.topics$;
  }

  // Börja lyssna efter uppdateringar av sökfältet
  public ngOnInit() {
    this.subs.add(
      this.search());
    this.subs.add(
      this.topic());
    this.filter.reset();
  }

  // Sluta lyssna efter uppdateringar av sökfältet
  // för att undvika minnesläckor
  public ngOnDestroy() {
    this.subs.unsubscribe();
  }

  // Lyssna efter uppdateringar av sökfältet
  private search = (
    ): Subscription => {
    return this.form.get('search')!
      .valueChanges
      .subscribe(value => {
        this.filter
          .update(value);
      });
  }

  // Lyssna efter uppdateringar av fältet för ämnesområde
  private topic = (
    ): Subscription => {
    return this.form.get('topic')!
      .valueChanges
      .subscribe(value => {
        this.filter
          .update(value);
      });
  }
}
