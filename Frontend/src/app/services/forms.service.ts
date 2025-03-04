import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  private apiUrl = 'https://projmanag-backend.onrender.com/api/forms';
<<<<<<< HEAD
=======
  // private apiUrl = 'http://localhost:52443/api/forms';
>>>>>>> 2a56009 (dist added)

  constructor(private http: HttpClient) { }

  getForms(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
