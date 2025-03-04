import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectDetailsComponent } from './project/project-details/project-details.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { ProjectService } from './services/project.service';
import { AuthModule } from './auth/auth.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TaskService } from './services/task.service';
import { FormsService } from './services/forms.service';
@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LoginComponent,
    ProjectDetailsComponent,
    DashboardComponent,
    AppComponent,
   ProjectListComponent,
   SignupComponent,
   AuthModule
],
  providers: [AuthGuard, AuthService, ProjectService,TaskService,FormsService,provideHttpClient(withInterceptorsFromDi())]
  
})
export class AppModule { }