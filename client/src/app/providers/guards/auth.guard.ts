import { Injectable } from '@angular/core';
import { CanLoad, Router, Route, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthStore } from '../auth-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private store: AuthStore, private router: Router) { }
  canLoad(route: Route): boolean {
    if (this.store.isAuthenticated) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.store.isAuthenticated) {
      return true;
    }
    this.router.navigate(["login"]);
    return false;
  }
}
