import { Component } from '@angular/core';
import { Project } from 'app/interfaces/project';
import { ProjectsService } from '../services/projects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  projects: Project[] = [];

  constructor(
    private projectService: ProjectsService,
    private router: Router,
    ){}

  ngOnInit(){
    this.projects = this.projectService.getProjects();
  }

  goTo(id:number){
    this.router.navigate(['/cruds/projects/edit', id])
  }
  
  deleteProj(id:number){
    this.projectService.deleteProject(id);
    this.ngOnInit();
  }
}
