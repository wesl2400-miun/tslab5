import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LabelI } from '../../../logic/interface/LabelI';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { SORT_MODE } from '../../../logic/ref/sortMode';
import { LABEL } from '../../../logic/ref/label';
import { SortModeI } from '../../../logic/interface/SortModeI';
import { OverviewService } from '../../../logic/service/overview/overview.service';

// UI-logiken för sorteringsformuläret
@Component({
  selector: 'app-sort-form',
  imports: [ReactiveFormsModule],
  templateUrl: './sort-form.component.html',
  styleUrl: './sort-form.component.css',
})
export class SortFormComponent {
  public form: FormGroup;
  private subs: Subscription;
  public sortMode: SortModeI;
  public label: LabelI;
  private overview: OverviewService;

  constructor(
    fBuilder: FormBuilder,
    overview: OverviewService) {
    this.form = fBuilder.group({
      sorter: [SORT_MODE.CODE]
    });
    this.sortMode = SORT_MODE;
    this.label = LABEL;
    this.subs = 
      new Subscription();
    this.overview = overview;
  }

  // Lyssna efter ändringar i formuläret
  public ngOnInit() {
    this.subs.add(
      this.sort());
  }

  // Sluta lyssna efter ändringar i formuläret
  public ngOnDestroy() {
    this.subs.unsubscribe();
  }

  // Sortera kurser när uppdatering av sorteringsformuläret
  private sort = (
    ): Subscription => {
    return this.form.get('sorter')!
      .valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(value => {
        this.overview
          .sort(value);
      });
  }

}
