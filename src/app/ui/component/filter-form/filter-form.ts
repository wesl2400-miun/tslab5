import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { combineLatest, Observable, Subscription, map } from 'rxjs';
import { Overview } from '../../../logic/service/overview';
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
  private overiew: Overview;
  public topics$: Observable<string[]>;

  constructor(
    fBuilder: FormBuilder,
    overview: Overview) {
    this.form = fBuilder.group({
      phrase: [''],
      topic: ['']
    });
    this.subs = 
      new Subscription();
    this.overiew = overview;
    const { topics$ 
      } = overview;
    this.topics$ = topics$;
  }

  public ngOnInit() {
    this.subs.add(
      this.filter());
  }

  public ngOnDestroy() {
    this.subs.unsubscribe();
  }

  private filter  = (
    ): Subscription => {
    return this.form
      .valueChanges.subscribe(
        ({ topic, phrase }) => {
        this.overiew.filter(
          topic, phrase);
      }
    )
  }

}
