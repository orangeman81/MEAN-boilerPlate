import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from './api.service';
import { Store } from '../models/store';
import { AuthState } from '../models/authState';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, EMPTY } from 'rxjs';
import { map, tap, filter, flatMap, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthStore extends Store<AuthState> {

  constructor(private api: ApiService, private router: Router) {
    super(new AuthState())
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
        map(res => res.user),
        tap((user: User) => {
          const newState: AuthState = new AuthState(
            new User(
              user._id,
              user.email,
              user.token
            ),
            true,
            "User logged successfully"
          )
          localStorage.setItem('token', user.token);
          this.state = newState;
          this.router.navigate(["main"])
          console.log("user logged in", newState);
        })
      )
  }

  logout(): Observable<any> {
    return this.api.$add('auth/logout', null)
      .pipe(
        tap(() => {
          this.state = new AuthState();
          localStorage.removeItem('token');
          this.router.navigate(['login']);
          console.log("user logged out", this.state);
        })
      );
  }

  $checkUser(): Observable<User> {
    if (this.isAuthenticated) {
      return this.$state
        .pipe(
          map(state => state.loggedIn),
          filter(loggedIn => !loggedIn),
          mergeMap(() => {
            return this.api.$findAll("auth/user")
              .pipe(
                map(res => res.user)
              )
          }),
          tap((user: User) => {
            const newState: AuthState = new AuthState(
              new User(
                user._id,
                user.email,
                user.token
              ),
              true,
              "User logged successfully"
            );
            this.state = newState;
            console.log("user logged in", newState);
          })
        )
    } else {
      const newState: AuthState = new AuthState(
        new User(),
        false,
        "Token expired"
      );
      this.state = newState;
      console.log("user logged out", newState);
      return EMPTY;
    }
  }

}