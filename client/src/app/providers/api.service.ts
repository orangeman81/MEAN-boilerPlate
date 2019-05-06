import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { first, last } from 'rxjs/operators';
import { Observable } from 'rxjs';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl: string = environment.apiUrl;

  get socket() {
    const token = localStorage.getItem('token');
    return io(
      this.apiUrl,
      {
        transportOptions: {
          polling: {
            extraHeaders: {
              token
            }
          }
        }
      }
    );
  }

  constructor(private http: HttpClient) { }

  $connect(connection: string) {
    let observable = new Observable(observer => {
      this.socket.on(connection, (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

  $findAll(url: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + url)
      .pipe(
        first()
      );
  }

  $findOne(url: string, id: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + url + '/' + id)
      .pipe(
        first()
      );
  }

  $search(url: string, query): Observable<any> {
    return this.http.get<any>(this.apiUrl + url + '/' + query)
      .pipe(
        first()
      );
  }

  $add(url: string, payload: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + url, payload)
      .pipe(
        last()
      );
  }

  $update(url: string, id: string, payload: any): Observable<any> {
    return this.http.patch<any>(this.apiUrl + url + '/' + id, payload)
      .pipe(
        last()
      );
  }

  $delete(url: string, id: string): Observable<any> {
    return this.http.delete<any>(this.apiUrl + url + '/' + id)
      .pipe(
        last()
      );
  }

}