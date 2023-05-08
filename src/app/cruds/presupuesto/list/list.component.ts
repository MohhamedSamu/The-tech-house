import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  projects: any[] = [];

  constructor(
    private router: Router,
    ){}

    ngOnInit(){
      // this.projects = this.projectService.getProjects();
    }

    
}
