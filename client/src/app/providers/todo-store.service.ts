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

  findAll(): Observable<Todo[]> {
    return this.$loaded
      .pipe(
        filter(loaded => !loaded),
        mergeMap(loaded => {
          return this.api.$findAll('todo')
            .pipe(
              map(res => res.data),
              tap(() => this.loaded = !loaded)
            );
        }),
        map(todo => {
          const newState: TodoState = {
            todos: todo,
            loaded: true
          }
          this.state = newState;
          console.log('store loaded: ' + this.loaded);
          console.log(todo);
          return todo;
        })
      );
  };

  findOne(id: string): Observable<Todo> { return };

  addOne(payload: Todo): Observable<Todo> {
    return this.api.$add('todo/create', payload)
      .pipe(
        map(res => {
          res = res.data;
          const newState = {
            ...this.state,
            todos: [...this.state.todos, res],
            loaded: true
          };
          this.state = newState;
          return res;
        })
      );
  };
  update(payload: Todo, id: string): Observable<Todo> { return };
  delete(id: string): Observable<Todo> { return };

}
