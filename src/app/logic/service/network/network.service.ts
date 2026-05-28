import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { DialogService } from '../dialog/dialog.service';
import { DIALOG } from '../../ref/dialog';
import { Message } from '../../model/Message';
import { CSS_CLASS } from '../../ref/cssClass';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private http: HttpClient;
  private dialog: DialogService;

  constructor(
    http: HttpClient,
    dialog: DialogService) {
    this.http = http;
    this.dialog = dialog;
  }

  public connect = (
    url: string, onConnect: 
    (data: any) => void
  ): Subscription => {
    return this.http.get(url)
      .subscribe({
        next: (data: any) => 
          onConnect(data),
        error: (err: any) => 
          this.onError(err)
      });
  }

  private onError = (
    err: any) => {
    console.error(
      err.message);
    this.dialog.update(
      new Message(
        DIALOG.COURSES_FAIL, 
        CSS_CLASS.DIAG_ERR));
  }
}
