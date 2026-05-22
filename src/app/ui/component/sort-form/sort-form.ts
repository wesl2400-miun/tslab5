import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LabelI } from '../../../logic/interface/LabelI';
import { Subscription } from 'rxjs';
import { SORT_MODE } from '../../../logic/ref/sortMode';
import { LABEL } from '../../../logic/ref/label';
import { SortModeI } from '../../../logic/interface/SortModeI';
import { Overview } from '../../../logic/service/overview';

@Component({
  selector: 'app-sort-form',
  imports: [ReactiveFormsModule],
  templateUrl: './sort-form.html',
  styleUrl: './sort-form.css',
})
export class SortForm {
  public form: FormGroup;
  private subs: Subscription;
  public sortMode: SortModeI;
  public label: LabelI;
  private overview: Overview;

  // Initiera formuläret och data
  constructor(
    fBuilder: FormBuilder,
    overview: Overview) {
    this.form = fBuilder.group({
      sorter: [SORT_MODE.CODE]
    });
    this.sortMode = SORT_MODE;
    this.label = LABEL;
    this.subs = 
      new Subscription();
    this.overview = overview;
  }

  // Börja lyssna efter uppdateringar av formuläret
  public ngOnInit() {
    this.subs.add(
      this.sort());
  }

  // Sluta lyssna efter uppdateringar, så
  // att Rx-flödet inte fortsätter köra i bakgrunden
  // och orsakar inte minnesläckor
  public ngOnDestroy() {
    this.subs.unsubscribe();
  }

  // Lyssna efter uppdateringar av radioknappar för sortering
  private sort = (
    ): Subscription => {
    return this.form.get('sorter')!
      .valueChanges
      .subscribe(value => {
        this.overview
          .sort(value);
      });
  }

}
