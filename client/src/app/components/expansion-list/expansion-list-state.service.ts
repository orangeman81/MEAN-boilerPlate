import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpansionListState {

  private actions$: BehaviorSubject<number | string> = new BehaviorSubject<number | string>(null);
  public $actions: Observable<number | string> = this.actions$.asObservable();

  constructor() { }

  action(action: number | string) {
      this.actions$.next(action);
  }

}
