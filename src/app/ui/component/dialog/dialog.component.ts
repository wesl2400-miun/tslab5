import { Component } from '@angular/core';
import { DialogService } from '../../../logic/service/dialog/dialog.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { extract$ } from '../../../logic/util/utils';

@Component({
  selector: 'app-dialog',
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  private dialog: DialogService;
  public content$: Observable<string>
  public cssClass$: Observable<string>

  constructor(
    dialog: DialogService) {
    this.dialog = dialog;
    const { message$ 
      } = this.dialog;
    this.content$ = extract$(
      message$, 'content');
    this.cssClass$ = extract$(
      message$, 'cssClass');
  }

  public get show
    (): boolean {
    return this.dialog
      .show();
  }
}
