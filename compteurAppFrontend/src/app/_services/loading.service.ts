import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _loader = new Subject<string>();

  get loader() {
    return this._loader.asObservable();
  }

  emettreEvenement(message: string) {
    this._loader.next(message);
  }
}
