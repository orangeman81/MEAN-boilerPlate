import { AuthState } from '../../models/authState';
import { Subscription, Observable } from 'rxjs';
import { AuthStore } from '../../providers/auth-store.service';
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user';
import { map } from 'rxjs/operators';

@Component({
  selector: 'lv-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnInit, OnDestroy {

  sub: Subscription;
  logoutS: Subscription;
  $logged: Observable<boolean>;
  user: User;

  constructor(private store: AuthStore) { }

  ngOnInit() {
    this.$logged = this.store.$state
      .pipe(
        map((state: AuthState) => state.loggedIn)
      )
    this.sub = this.store.$checkUser()
      .subscribe((user: User) => this.user = user);
  }

  logout() {
    this.logoutS = this.store.logout()
      .subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.logoutS ? this.logoutS.unsubscribe() : null;
  }

}