import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lv-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {

  constructor() { }

}
