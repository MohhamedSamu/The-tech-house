import { Injectable } from '@angular/core';
import { ActivosFijos } from 'app/interfaces/activos-fijos';

const TABLE_NAME = "activosFijos";

@Injectable({
  providedIn: 'root'
})
export class ActivosFijosService {
  activosFijos: ActivosFijos[] = [];

  constructor() { }

  addActivosFijo(newActivosFijo: ActivosFijos): void
  {
    this.activosFijos = this.getItem();
    newActivosFijo.id = this.activosFijos.length + 1;
    this.activosFijos.push(newActivosFijo);
    this.setItem(this.activosFijos);
  }

  getActivosFijos(projId : number): ActivosFijos[]
  {
    this.activosFijos = this.getItem();
    return this.activosFijos.filter((ActivosFijo) => ActivosFijo.projectId == projId);
  }

  cloneActivosFijos(projId : number): void
  {
    this.activosFijos = this.getItem();
    let activosFijosToClone = this.activosFijos.filter((ActivosFijo) => ActivosFijo.projectId == projId);
    this.activosFijos = [...this.activosFijos, ...activosFijosToClone];
    this.setItem(this.activosFijos);
  }

  getActivosFijoById(id: number): ActivosFijos
  {
    this.activosFijos = this.getItem();
    return this.activosFijos.filter((ActivosFijo) => ActivosFijo.id == id)[0];
  }

  editActivosFijo(ActivosFijoToEdit: ActivosFijos): void
  {
    this.activosFijos = this.getItem();
    const indexToEdit = this.activosFijos.map(ActivosFijo => ActivosFijo.id).indexOf(ActivosFijoToEdit.id);

    if (indexToEdit !== -1) {
      this.activosFijos[indexToEdit] = ActivosFijoToEdit;
    }
    this.setItem(this.activosFijos);
  }

  deleteActivosFijo(ActivosFijoIdToDelete: number): void
  {
    this.activosFijos = this.getItem();
    this.activosFijos = this.activosFijos.filter((ActivosFijo) => ActivosFijo.id != ActivosFijoIdToDelete);
    this.setItem(this.activosFijos);
  }

  deleteAllActivosFijoByProj(projId: number): void
  {
    this.activosFijos = this.getItem();
    this.activosFijos = this.activosFijos.filter((ActivosFijo) => ActivosFijo.projectId != projId);
    this.setItem(this.activosFijos);
  }

  getItem(){
    if (localStorage.getItem(TABLE_NAME) == "" || localStorage.getItem(TABLE_NAME) == undefined){
      this.setItem([]);
    }
    return JSON.parse(localStorage.getItem(TABLE_NAME))
  }
  setItem(item:any){
    localStorage.setItem(TABLE_NAME, JSON.stringify(item));
  }
}
