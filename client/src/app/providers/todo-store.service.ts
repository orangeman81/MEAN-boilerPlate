import { Actions } from '../models/actions';
import { Store } from '../models/store';
import { Todo } from '../models/todo';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { TodoState } from '../models/todoState';

@Injectable({
  providedIn: 'root'
})
export class TodoStore extends Store<TodoState> implements Actions<Todo> {

  constructor(private api: ApiService) {
    super(new TodoState());
  }

  connect(connection: string) {
    return this.api.$connect('todo');
  }

  findAll(): Observable<Todo[]> {

    return this.$state
      .pipe(
        map(state => state.loaded),
        filter(loaded => !loaded),
        mergeMap(() => {
          return this.api.$findAll('todo')
            .pipe(
              map(res => res.data)
            );
        }),
        tap((todo: Todo[]) => {
          const newState: TodoState = {
            todos: todo,
            loaded: true
          }
          this.state = newState;
          console.log('store loaded ', newState);
        })
      )
  };

  findOne(id: string): Observable<Todo> { return };

  addOne(payload: Todo): Observable<Todo> {
    return this.api.$add('todo/create', payload)
      .pipe(
        map(res => res.data),
        tap((todo: Todo) => {
          const newState = {
            ...this.state,
            todos: [...this.state.todos, todo],
            loaded: true
          };
          this.state = newState;
          console.log('store loaded ', newState);
        })
      );
  };
  update(payload: Todo, id: string): Observable<Todo> { return };
  delete(id: string): Observable<Todo> { return };

}
