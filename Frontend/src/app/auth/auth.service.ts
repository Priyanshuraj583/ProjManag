import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://projmanag-backend.onrender.com/api/auth';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      map(response => {
        if (response.token) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          return response;
        }
        return null;
      }),
      catchError(() => of(null))
    );
  }

  signup(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/signup`, { username, password }).pipe(
      map(response => !!response.success),
      catchError(() => of(false))
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): any {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
  }

  isLoggedIn(): boolean {
    const currentUser = this.getCurrentUser();
    return currentUser && currentUser.token ? true : false;
  }
}
