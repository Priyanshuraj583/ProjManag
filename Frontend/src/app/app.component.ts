import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})


export class AppComponent{
 
  constructor(private router: Router) {}
  title = 'project-management-dashboard';

  signup() {
console.log('test');
    this.router.navigate(['/signup']);

  }
  login() {
    console.log('logIn');
        this.router.navigate(['/login']);
    
      }
}
