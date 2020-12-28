import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { listTodo } from '../modal/todo.modal';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  constructor(private http: HttpClient) {}

  getLists(): Observable<listTodo[]> {
    return this.http.get(environment.apiUrl + '/lists').pipe(
      map((rs) => {
        if (rs) {
          return rs as listTodo[];
        }
        throwError('Error');
      })
    );
  }

  addNewList(name: string): Observable<listTodo> {
    return this.http.post(environment.apiUrl + '/lists', { name }).pipe(
      map((rs) => {
        if (rs) {
          return rs as listTodo;
        }
        throwError('Error');
      })
    );
  }

  deleteList(listId: number): Observable<boolean> {
    return this.http.delete(environment.apiUrl + '/lists/' + listId).pipe(
      map((rs) => {
        if (rs) {
          return true;
        }
        throwError('Error');
      })
    );
  }

  modifyList(listId: number, name: string): Observable<listTodo> {
    return this.http
      .put(environment.apiUrl + '/lists/' + listId, {
        name,
      })
      .pipe(
        map((d) => {
          if (d) {
            return d as listTodo;
          }
          throwError('Error');
        })
      );
  }
}
