import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService, Project } from '../../services/project.service';
import { jsPDF } from 'jspdf';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class ProjectDetailsComponent implements OnInit {
  project: Project | undefined;
  projectId!: number;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.projectId = +this.route.snapshot.paramMap.get('id')!;
    this.projectService.getProject(this.projectId).subscribe((data: Project) => this.project = data);
  }

  exportAsPDF() {
    const doc = new jsPDF();
    if (this.project) {
      doc.text(`Project Name: ${this.project.name}`, 10, 10);
      doc.text(`Status: ${this.project.status}`, 10, 20);
      doc.text('Tasks:', 10, 30);
      this.project.tasks.forEach((task: any, index: number) => {
        doc.text(`${index + 1}. ${task.desc} (${task.status})`, 10, 40 + (index * 10));
      });
      doc.text(`Focus for Next Week: ${this.project.focusNextWeek}`, 10, 50 + (this.project.tasks.length * 10));
      doc.save(`${this.project.name}-status.pdf`);
    }
  }
}