import { Injectable } from '@angular/core';
import { CostoIndirecto } from '../../../interfaces/costo-indirecto'

const TABLE_NAME = "CostosIndirectos";

@Injectable({
  providedIn: 'root'
})
export class CostoIndirectoService {
  costosIndirectos: CostoIndirecto[] = [];

  constructor() { }

  addActivosFijo(newActivosFijo: CostoIndirecto): void
  {
    this.costosIndirectos = this.getItem();
    newActivosFijo.id = this.costosIndirectos.length + 1;
    this.costosIndirectos.push(newActivosFijo);
    this.setItem(this.costosIndirectos);
  }

  getActivosFijos(projId : number): CostoIndirecto[]
  {
    this.costosIndirectos = this.getItem();
    return this.costosIndirectos.filter((CostoIndirecto) => CostoIndirecto.projectId == projId);
  }

  getActivosFijoById(id: number): CostoIndirecto
  {
    this.costosIndirectos = this.getItem();
    return this.costosIndirectos.filter((CostoIndirecto) => CostoIndirecto.id == id)[0];
  }

  editActivosFijo(ActivosFijoToEdit: CostoIndirecto): void
  {
    this.costosIndirectos = this.getItem();
    const indexToEdit = this.costosIndirectos.map(CostoIndirecto => CostoIndirecto.id).indexOf(ActivosFijoToEdit.id);

    if (indexToEdit !== -1) {
      this.costosIndirectos[indexToEdit] = ActivosFijoToEdit;
    }
    this.setItem(this.costosIndirectos);
  }

  deleteActivosFijo(ActivosFijoIdToDelete: number): void
  {
    this.costosIndirectos = this.getItem();
    this.costosIndirectos = this.costosIndirectos.filter((CostoIndirecto) => CostoIndirecto.id != ActivosFijoIdToDelete);
    this.setItem(this.costosIndirectos);
  }

  deleteAllActivosFijoByProj(projId: number): void
  {
    this.costosIndirectos = this.getItem();
    this.costosIndirectos = this.costosIndirectos.filter((CostoIndirecto) => CostoIndirecto.projectId != projId);
    this.setItem(this.costosIndirectos);
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
