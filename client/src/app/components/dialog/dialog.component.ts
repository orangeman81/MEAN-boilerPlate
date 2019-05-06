import { Component, Input, Output, EventEmitter } from '@angular/core';
import { showContent } from './dialog.animations';

@Component({
  selector: 'lv-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  animations: [
    showContent
  ]
})
export class DialogComponent {

  @Input()
  open: boolean = false;

  @Output()
  action: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  data: any;

  constructor() { }

}
