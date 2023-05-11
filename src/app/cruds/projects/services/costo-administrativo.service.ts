import { Injectable } from '@angular/core';
import { CostoAdministrativo } from '../../../interfaces/costo-administrativo'

const TABLE_NAME = "CostosAdministrativos";

@Injectable({
  providedIn: 'root'
})
export class CostoAdministrativoService {
  costosAdministrativos: CostoAdministrativo[] = [
    {
      "name": "Sueldos y salarios",
      "projectId": 1,
      "valor": 85910,
      "incrementoAnual": 5,
      "id": 1
  },
  {
      "name": "Facturas de servicios de agua potable ",
      "projectId": 1,
      "valor": 180,
      "incrementoAnual": 2.25,
      "id": 2
  },
  {
      "name": "Facturas de electricidad",
      "projectId": 1,
      "valor": 1200,
      "incrementoAnual": 3.35,
      "id": 3
  },
  {
      "name": "Facturas de internet y telefonía personal",
      "projectId": 1,
      "valor": 1080,
      "incrementoAnual": 2.95,
      "id": 4
  },
  {
    "name": "Sueldos y salarios",
    "projectId": 2,
    "valor": 85910,
    "incrementoAnual": 5,
    "id": 5
},
{
    "name": "Facturas de servicios de agua potable ",
    "projectId": 2,
    "valor": 180,
    "incrementoAnual": 2.25,
    "id": 6
},
{
    "name": "Facturas de electricidad",
    "projectId": 2,
    "valor": 1200,
    "incrementoAnual": 3.35,
    "id": 7
},
{
    "name": "Facturas de internet y telefonía personal",
    "projectId": 2,
    "valor": 1080,
    "incrementoAnual": 2.95,
    "id": 8
}
  ];

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

  cloneCostoAdministrativos(projId : number, newProjId:number): void
  {
    this.costosAdministrativos = this.getItem();
    let costosAdministrativosToClone = this.costosAdministrativos.filter((CostoAdministrativo) => CostoAdministrativo.projectId == projId);
    let newId = this.costosAdministrativos.length + 1;
    costosAdministrativosToClone.forEach((costo) => {
      costo.id = newId;
      costo.projectId = newProjId
      this.addCostoAdministrativo(costo);
      newId++;
    })
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
      this.setItem(this.costosAdministrativos);
    }
    return JSON.parse(localStorage.getItem(TABLE_NAME))
  }
  setItem(item:any){
    localStorage.setItem(TABLE_NAME, JSON.stringify(item));
  }
}
