import { Injectable } from '@angular/core';
import { CostoDirecto } from '../../../interfaces/costo-directo'

const TABLE_NAME = "CostosDirectos";


@Injectable({
  providedIn: 'root'
})
export class CostoDirectoService {
  costosDirectos: CostoDirecto[] = [];

  constructor() { }

  addCostoDirecto(newCostoDirecto: CostoDirecto): void
  {
    this.costosDirectos = this.getItem();
    newCostoDirecto.id = this.costosDirectos.length + 1;
    this.costosDirectos.push(newCostoDirecto);
    this.setItem(this.costosDirectos);
  }

  getCostoDirectos(projId : number): CostoDirecto[]
  {
    this.costosDirectos = this.getItem();
    return this.costosDirectos.filter((CostoDirecto) => CostoDirecto.projectId == projId);
  }

  cloneCostoDirectos(projId : number): void
  {
    this.costosDirectos = this.getItem();
    let costosDirectosToClone = this.costosDirectos.filter((CostoDirecto) => CostoDirecto.projectId == projId);
    this.costosDirectos = [...this.costosDirectos, ...costosDirectosToClone];
    this.setItem(this.costosDirectos);
  }

  getCostoDirectoById(id: number): CostoDirecto
  {
    this.costosDirectos = this.getItem();
    return this.costosDirectos.filter((CostoDirecto) => CostoDirecto.id == id)[0];
  }

  editCostoDirecto(CostoDirectoToEdit: CostoDirecto): void
  {
    this.costosDirectos = this.getItem();
    const indexToEdit = this.costosDirectos.map(CostoDirecto => CostoDirecto.id).indexOf(CostoDirectoToEdit.id);

    if (indexToEdit !== -1) {
      this.costosDirectos[indexToEdit] = CostoDirectoToEdit;
    }
    this.setItem(this.costosDirectos);
  }

  deleteCostoDirecto(CostoDirectoIdToDelete: number): void
  {
    this.costosDirectos = this.getItem();
    this.costosDirectos = this.costosDirectos.filter((CostoDirecto) => CostoDirecto.id != CostoDirectoIdToDelete);
    this.setItem(this.costosDirectos);
  }

  deleteAllCostoDirectoByProj(projId: number): void
  {
    this.costosDirectos = this.getItem();
    this.costosDirectos = this.costosDirectos.filter((CostoDirecto) => CostoDirecto.projectId != projId);
    this.setItem(this.costosDirectos);
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
