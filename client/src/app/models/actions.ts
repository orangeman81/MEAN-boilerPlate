import { Observable } from 'rxjs';

export interface Actions<T> {
    findAll(): Observable<T[]>;
    findOne(id: string): Observable<T>;
    addOne(payload: T): Observable<T>;
    update(payload: T, id: string): Observable<T>;
    delete(id: string): Observable<T>;
}