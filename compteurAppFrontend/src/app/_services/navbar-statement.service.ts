import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NavbarStatementService {

  constructor() { }

  // private condition1Subject = new BehaviorSubject<boolean>(false);
  // private condition2Subject = new BehaviorSubject<boolean>(false);
  private navBarIsLockedSubject = new BehaviorSubject<boolean>(false);
  private condition1: boolean = false;
  private condition2: boolean = false;

  // condition1$ = this.condition1Subject.asObservable();
  // condition2$ = this.condition2Subject.asObservable();
  navBarIsLocked$ = this.navBarIsLockedSubject.asObservable();

  setCondition1(value: boolean): void {
   this.condition1 = value;
   this.navBarIsLockedSubject.next(this.condition1 && this.condition2);
    console.log("condition1 : "+this.condition1)
  }

  setCondition2(value: boolean): void {
    this.condition2 = value;
    this.navBarIsLockedSubject.next(this.condition1 && this.condition2);
    console.log("condition2 : "+this.condition2)
  }
}
