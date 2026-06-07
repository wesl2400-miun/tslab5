import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscription, distinctUntilChanged, map } from 'rxjs';
import { OverviewService } from '../../../logic/service/overview/overview.service';
import { CommonModule } from '@angular/common';

// UI-logiken bakom filtreringsfunktionaliteten
@Component({
  selector: 'app-filter-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './filter-form.component.html',
  styleUrl: './filter-form.component.css',
})
export class FilterFormComponent {
  public form: FormGroup;
  private subs: Subscription;
  private overiew: OverviewService;
  public topics$: Observable<string[]>;

  constructor(
    fBuilder: FormBuilder,
    overview: OverviewService) {
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

  // Lyssna efter ändringar i filterformuläret
  public ngOnInit() {
    this.subs.add(
      this.filter());
  }

  // sluta lyssna efter ändringar i filterformuläret
  public ngOnDestroy() {
    this.subs.unsubscribe();
  }

  // Filtrera kurslistan när filtrering appliceras
  private filter  = (
    ): Subscription => {
    return this.form
      .valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(
        ({ topic, phrase }) => {
        this.overiew.filter(
          topic, phrase);
      }
    )
  }
}
