import { Injectable } from '@angular/core';
import { CostoAdministrativo } from '../../../interfaces/costo-administrativo'

const TABLE_NAME = "CostosAdministrativos";

@Injectable({
  providedIn: 'root'
})
export class CostoAdministrativoService {
  costosAdministrativos: CostoAdministrativo[] = [];

  constructor() { }

  addCostoAdministrativo(newCostoAdministrativo: CostoAdministrativo): void
  {
    this.costosAdministrativos = this.getItem();
    newCostoAdministrativo.id = this.costosAdministrativos.length + 1;
    this.costosAdministrativos.push(newCostoAdministrativo);
    this.setItem(this.costosAdministrativos);
  }

  getCostoAdministrativos(projId : number): CostoAdministrativo[]
  {
    this.costosAdministrativos = this.getItem();
    return this.costosAdministrativos.filter((CostoAdministrativo) => CostoAdministrativo.projectId == projId);
  }

  getCostoAdministrativoById(id: number): CostoAdministrativo
  {
    this.costosAdministrativos = this.getItem();
    return this.costosAdministrativos.filter((CostoAdministrativo) => CostoAdministrativo.id == id)[0];
  }

  editCostoAdministrativo(CostoAdministrativoToEdit: CostoAdministrativo): void
  {
    this.costosAdministrativos = this.getItem();
    const indexToEdit = this.costosAdministrativos.map(CostoAdministrativo => CostoAdministrativo.id).indexOf(CostoAdministrativoToEdit.id);

    if (indexToEdit !== -1) {
      this.costosAdministrativos[indexToEdit] = CostoAdministrativoToEdit;
    }
    this.setItem(this.costosAdministrativos);
  }

  deleteCostoAdministrativo(CostoAdministrativoIdToDelete: number): void
  {
    this.costosAdministrativos = this.getItem();
    this.costosAdministrativos = this.costosAdministrativos.filter((CostoAdministrativo) => CostoAdministrativo.id != CostoAdministrativoIdToDelete);
    this.setItem(this.costosAdministrativos);
  }

  deleteAllCostoAdministrativoByProj(projId: number): void
  {
    this.costosAdministrativos = this.getItem();
    this.costosAdministrativos = this.costosAdministrativos.filter((CostoAdministrativo) => CostoAdministrativo.projectId != projId);
    this.setItem(this.costosAdministrativos);
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
