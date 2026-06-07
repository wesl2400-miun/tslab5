import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../../model/Message';

// Tjänsten för popup-fönster
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

  // Ändra popup-meddelandet
  private setMsg = (
    message: Message
    ): void => {
    this.msgSbj
      .next(message);
  }

  // Uppdatera popupmeddelandet och sen nollställ det efter några sekunder för att skapa popupeffekten
  public update = (
    message: Message) => {
    this.setMsg(message);
    setTimeout(() => {
      this.setMsg(
        new Message());
    }, 4000);
  }

  // Visa popupmeddelandet
  public show = 
    (): boolean => {
    const msg = 
      this.msgSbj
      .getValue();
    return msg.content 
      !== '';
  }
}
