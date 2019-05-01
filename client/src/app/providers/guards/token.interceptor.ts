import { AuthStore } from '../auth-store.service';
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public store: AuthStore) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.store.isAuthenticated) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Token ${this.store.token}`
                }
            });
        }
        return next.handle(request);
    }
}