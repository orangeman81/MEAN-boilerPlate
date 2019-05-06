import { Todo } from './../models/todo';
import { AuthState } from '../models/authState';
import { AuthStore } from '../providers/auth-store.service';
import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoStore } from '../providers/todo-store.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy {

  sub: Subscription;
  $loaded: Observable<boolean>;
  $userId: Observable<string>;

  constructor(private store: TodoStore, private auth: AuthStore) { }

  ngOnInit() {
    // this.sub = this.store.connect('todo')
    //   .subscribe(console.log);

    this.$userId = this.auth.$state
      .pipe(
        map((auth: AuthState) => auth.user._id)
      );

    this.$loaded = this.store.$state
      .pipe(
        map(state => state.loaded)
      );

    this.sub = this.store.findAll()
      .subscribe();
  }

  save(todo: Todo) {
    this.sub = this.$userId
      .pipe(
        switchMap(userId => {
          todo.userId = userId;
          return this.store.addOne(todo)
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.sub ? this.sub.unsubscribe() : null;
  }

}
