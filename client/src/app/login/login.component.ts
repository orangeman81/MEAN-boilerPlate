import { AuthStore } from '../providers/auth-store.service';
import { Subscription } from 'rxjs';
import { ApiService } from './../providers/api.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  sub: Subscription;
  constructor(private store: AuthStore) { }

  ngOnInit() {
  }

  signIn(credentials) {
    this.sub = this.store.login(credentials)
      .subscribe();
  }

  ngOnDestroy() {
    this.sub ? this.sub.unsubscribe() : null;
  }

}
