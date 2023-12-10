import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NavbarStatementService {

  constructor() { }

  private condition1Subject = new BehaviorSubject<boolean>(false);
  private condition2Subject = new BehaviorSubject<boolean>(false);

  condition1$ = this.condition1Subject.asObservable();
  condition2$ = this.condition2Subject.asObservable();

  setCondition1(value: boolean): void {
    this.condition1Subject.next(value);
  }

  setCondition2(value: boolean): void {
    this.condition2Subject.next(value);
  }


}
