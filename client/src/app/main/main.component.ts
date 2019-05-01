import { Subscription } from 'rxjs';
import { TodoStore } from '../providers/todo-store.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  sub: Subscription;

  constructor(private store: TodoStore) { }

  ngOnInit() {
    this.sub = this.store.findAll()
      .subscribe()
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
