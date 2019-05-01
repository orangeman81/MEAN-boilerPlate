import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoStore } from 'src/app/providers/todo-store.service';
import { TodoState } from 'src/app/models/todoState';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  $todos: Observable<TodoState> = this.store.$state;

  constructor(private store: TodoStore) { }

}