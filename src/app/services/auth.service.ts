import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(`${username}:${password}`),
      }),
    };

    return this.http.post(
      environment.apiUrl + '/auth/login',
      null,
      httpOptions
    );
  }

  logout() {
    return this.http.post(environment.apiUrl + '/auth/logout', null);
  }
}
