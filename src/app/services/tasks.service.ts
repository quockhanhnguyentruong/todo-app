import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Task } from '../modal/todo.modal';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getTasks(listId: number): Observable<Task[]> {
    return this.http
      .get(environment.apiUrl + '/lists/' + listId + '/tasks')
      .pipe(
        map((d) => {
          if (d) {
            return d as Task[];
          }
          throwError('Error');
        })
      );
  }
  createTask(listId: number, name: string): Observable<Task> {
    return this.http
      .post(environment.apiUrl + '/lists/' + listId + '/tasks', {
        name,
        completed: false,
      })
      .pipe(
        map((d) => {
          if (d) {
            return d as Task;
          }
          throwError('Error');
        })
      );
  }

  modifyTask(listId: number, taskId: number, task: Task): Observable<Task> {
    const params = {
      name: task.name,
      completed: task.completed,
      listId: task.listId,
    };
    return this.http
      .put(environment.apiUrl + '/lists/' + listId + '/tasks/' + taskId, params)
      .pipe(
        map((d) => {
          if (d) {
            return d as Task;
          }
          throwError('Error');
        })
      );
  }

  deleteTask(listId: number, taskId: number): Observable<boolean> {
    return this.http
      .delete(environment.apiUrl + '/lists/' + listId + '/tasks/' + taskId)
      .pipe(
        map((d) => {
          if (d) {
            return true;
          }
          throwError('Error');
        })
      );
  }
}
