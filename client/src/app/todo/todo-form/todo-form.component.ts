import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  todoForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    userId: new FormControl(''),
  });

  @Input()
  data: any;

  @Output()
  save: EventEmitter<FormData> = new EventEmitter<FormData>();

  ngOnInit() {
    if (this.data) {
      this.todoForm.patchValue(this.data);
    }
  }

}
