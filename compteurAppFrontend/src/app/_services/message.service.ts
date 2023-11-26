import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {


  private messageSource = new BehaviorSubject<string>('');
  currentMessage = this.messageSource.asObservable();

  private popupSource = new BehaviorSubject<boolean>(false);
  currentPopup = this.popupSource.asObservable();

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  changePopup(popup: boolean) {
    this.popupSource.next(popup);
  }
}
