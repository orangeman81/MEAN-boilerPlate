import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { ComponentsModule } from './../components/components.module';
import { TodoComponent } from './todo.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoListComponent } from './todo-list/todo-list.component';

@NgModule({
  declarations: [TodoComponent, TodoFormComponent, TodoListComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    ComponentsModule
  ]
})
export class TodoModule { }
