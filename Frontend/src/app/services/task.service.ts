import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://projmanag-backend.onrender.com/api/tasks';
<<<<<<< HEAD
=======
  // private apiUrl = 'http://localhost:52443/api/tasks';
>>>>>>> 2a56009 (dist added)

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addTask(name: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { name });
  }

  updateTaskStatus(id: number, status: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, { status });
  }
}
