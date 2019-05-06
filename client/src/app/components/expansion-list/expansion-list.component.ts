import { Component, OnDestroy, ContentChildren, QueryList, ChangeDetectionStrategy, AfterContentInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExpansionListState } from './expansion-list-state.service';
import { tap } from 'rxjs/operators';
import { ExpandableComponent } from './expandable/expandable.component';

@Component({
  selector: 'lv-expansion-list',
  templateUrl: './expansion-list.component.html',
  styleUrls: ['./expansion-list.component.scss'],
  providers: [ExpansionListState],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpansionListComponent implements AfterContentInit, OnDestroy {

  sub: Subscription;

  @ContentChildren(ExpandableComponent)
  list: QueryList<ExpandableComponent>

  constructor(private listState: ExpansionListState) { }

  ngAfterContentInit() {
    this.sub = this.listState.$actions
      .pipe(
        tap((action) => {
          this.select(action)
        })
      ).subscribe();
  }

  select(action: number | string): void {
    this.list.toArray()
      .map((el: ExpandableComponent) => {
        el.index != action ? el.open = false : el.open = true;
      })
  }

  ngOnDestroy() {
    this.sub ? this.sub.unsubscribe() : null;
  }


}
