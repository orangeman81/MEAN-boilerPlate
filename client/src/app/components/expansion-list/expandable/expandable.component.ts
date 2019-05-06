import { Component, HostListener, Input } from '@angular/core';
import { ExpansionListState } from '../expansion-list-state.service';
import { showContent, rotateIcon, openList } from './expandable.animation';

@Component({
  selector: 'lv-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss'],
  animations: [
    showContent,
    rotateIcon,
    openList
  ]

})
export class ExpandableComponent {

  @HostListener('click') toggle() {
    if (this.open) {
      this.open = false;
    } else {
      this.open = true;
      this.listState.action(this.index);
    }
  }

  @Input()
  title: string;

  @Input()
  subtitle: string;

  @Input()
  open: boolean = false;

  @Input()
  index: number;

  constructor(private listState: ExpansionListState) { }


}
