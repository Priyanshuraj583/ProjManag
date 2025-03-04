import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ProjectService, Project } from '../services/project.service';
import { FormsService } from '../services/forms.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule,FormsModule]
})
export class DashboardComponent implements OnInit {
  username!: string;
  role!: string;
  projects: Project[] = [];
  forms: any[] = [];
  selectedForm: any;
  selectedProject: Project | undefined;
  newTaskDesc: string = '';
  newTaskStatus: string = 'in-progress';
  statusMessage: string = '';
  newProject: Project = { id: 0, name: '', status: '', focusNextWeek: '', tasks: [], team: '' };
  filterTeam: string = '';
  filterStatus: string = '';

  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
    private formsService: FormsService,
    private router: Router
  ) { }

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    this.username = currentUser?.username;
    this.role = currentUser?.role;

    this.projectService.getProjects().subscribe(data => this.projects = data);
    this.formsService.getForms().subscribe(data => this.forms = data);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  selectForm(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedForm = this.forms.find(form => form.id === +target.value);
  }

  selectProject(project: Project) {
    this.selectedProject = project;
  }

  addTask() {
    if (this.newTaskDesc.trim()) {
      if (this.selectedProject && this.selectedProject.tasks) {
        const newTask = { id: this.selectedProject.tasks.length + 1, desc: this.newTaskDesc, status: this.newTaskStatus };
        this.selectedProject.tasks.push(newTask);
      }
      this.newTaskDesc = '';
      this.newTaskStatus = 'in-progress';
    }
  }

  updateProjectStatus() {
    if (this.selectedProject) {
      this.projectService.updateProject(this.selectedProject.id, this.selectedProject).subscribe(updatedProject => {
        this.statusMessage = 'Project status updated successfully!';
        setTimeout(() => this.statusMessage = '', 3000);
      });
    }
  }

  addProject() {
    this.projectService.addProject(this.newProject).subscribe(newProject => {
      this.projects.push(newProject);
      this.newProject = { id: 0, name: '', status: '', focusNextWeek: '', tasks: [], team: '' };
    });
  }

  filterProjects(): Project[] {
    return this.projects.filter(project =>
      (!this.filterTeam || project.team === this.filterTeam) &&
      (!this.filterStatus || project.status === this.filterStatus)
    );
  }
}