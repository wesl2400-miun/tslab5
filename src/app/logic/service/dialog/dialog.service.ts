import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../../model/Message';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private msgSbj: BehaviorSubject<Message>;
  public message$: Observable<Message>;

  constructor() {
    this.msgSbj = 
      new BehaviorSubject<
        Message>(new Message());
    this.message$ = this.msgSbj
      .asObservable();
  }

  private setMsg = (
    message: Message
    ): void => {
    this.msgSbj
      .next(message);
  }

  public update = (
    message: Message) => {
    this.setMsg(message);
    setTimeout(() => {
      this.setMsg(
        new Message());
    }, 4000);
  }

  public show = 
    (): boolean => {
    const msg = 
      this.msgSbj
      .getValue();
    return msg.content 
      !== '';
  }
}
