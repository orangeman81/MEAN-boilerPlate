import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from './api.service';
import { Store } from '../models/store';
import { Auth } from '../models/auth';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, EMPTY } from 'rxjs';
import { map, tap, filter, flatMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthStore extends Store<Auth> {

  constructor(private api: ApiService, private router: Router) {
    super(new Auth())
  }

  get token() {
    return localStorage.getItem("token");
  }

  get isAuthenticated(): boolean {
    const helper = new JwtHelperService();
    const results = !helper.isTokenExpired(this.token);
    return results;
  }

  login(credentials): Observable<any> {
    const user = {
      user: {
        email: credentials.email,
        password: credentials.password
      }
    }

    return this.api.$add('auth/login', user)
      .pipe(
        map((res: any) => {
          res = res.user;
          const AuthState: Auth = new Auth(
            new User(
              res._id,
              res.email,
              res.token
            ),
            true,
            "User logged successfully"
          )
          localStorage.setItem('token', res.token);
          this.state = AuthState;
          this.loaded = true;
          console.log("user logged in", this.state);
        }),
        tap(() => this.router.navigate(["main"]))
      )
  }

  logout(): Observable<any> {
    return this.api.$add('auth/logout', null)
      .pipe(
        tap(() => {
          this.state = new Auth();
          this.loaded = false;
          localStorage.removeItem('token');
          this.router.navigate(['login']);
        })
      );
  }

  $checkUser(): Observable<User> {
    if (this.isAuthenticated) {
      return this.$loaded
        .pipe(
          filter(loaded => !loaded),
          flatMap(loaded => {
            this.loaded = true;
            return this.api.$findAll("auth/user")
          }),
          map(res => {
            const newState: Auth = new Auth(
              new User(
                res.user._id,
                res.user.email,
                res.user.token
              ),
              true,
              "User logged successfully"
            );
            this.state = newState;
            console.log("state changed", newState)
            return res.user;
          })
        )
    } else {
      this.loaded = false;
      return EMPTY;
    }
  }

}