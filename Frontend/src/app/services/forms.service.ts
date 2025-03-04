import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  private apiUrl = 'https://projmanag-backend.onrender.com/api/forms';

  constructor(private http: HttpClient) { }

  getForms(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
