import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Project } from 'app/interfaces/project';

const TABLE_NAME = "projects";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {


  constructor(private firestore: Firestore) { }


  addProject(newProject:Project){
    const projectsRef = collection(this.firestore, TABLE_NAME);
    return addDoc(projectsRef, newProject);
  }


}
