import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id: number;
  desc: string;
  status: string;
}

export interface Project {
  id: number;
  name: string;
  status: string;
  focusNextWeek: string;
  tasks: Task[];
  team: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:52443/api/projects';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  updateProject(id: number, data: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${id}`, data);
  }

  addProject(data: Project): Observable<Project> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return this.http.post<Project>(this.apiUrl, { ...data, token: currentUser.token });
  }
}