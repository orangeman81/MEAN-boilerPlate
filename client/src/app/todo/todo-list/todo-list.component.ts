import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoStore } from 'src/app/providers/todo-store.service';
import { TodoState } from 'src/app/models/todoState';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  @ViewChild(DialogComponent)
  dialog: DialogComponent;
  $todos: Observable<TodoState> = this.store.$state;

  constructor(private store: TodoStore) { }

  openDialog(data) {
    this.dialog.open = true;
    this.dialog.data = data;
  }

}