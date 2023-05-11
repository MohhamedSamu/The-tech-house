import { Injectable } from "@angular/core";
import { CostoDirecto } from "../../../interfaces/costo-directo";

const TABLE_NAME = "CostosDirectos";

@Injectable({
  providedIn: "root",
})
export class CostoDirectoService {
  costosDirectos: CostoDirecto[] = [
    {
      incrementoAnual: 7.5,
      name: "Suministros (productos)",
      projectId: 1,
      valor: 218434.8,
      id: 1,
    },
    {
      name: "Dominio y servidores informáticos",
      projectId: 1,
      valor: 75.06,
      incrementoAnual: 0,
      id: 2,
    },
    {
      name: "Google Workspace",
      projectId: 1,
      valor: 576,
      incrementoAnual: 0,
      id: 3,
    },
    {
      incrementoAnual: 7.5,
      name: "Suministros (productos)",
      projectId: 2,
      valor: 218434.8,
      id: 4,
    },
    {
      name: "Dominio y servidores informáticos",
      projectId: 2,
      valor: 75.06,
      incrementoAnual: 0,
      id: 5,
    },
    {
      name: "Google Workspace",
      projectId: 2,
      valor: 576,
      incrementoAnual: 0,
      id: 6,
    },
  ];

  constructor() {}

  addCostoDirecto(newCostoDirecto: CostoDirecto): void {
    this.costosDirectos = this.getItem();
    newCostoDirecto.id = this.costosDirectos.length + 1;
    this.costosDirectos.push(newCostoDirecto);
    this.setItem(this.costosDirectos);
  }

  getCostoDirectos(projId: number): CostoDirecto[] {
    this.costosDirectos = this.getItem();
    return this.costosDirectos.filter(
      (CostoDirecto) => CostoDirecto.projectId == projId
    );
  }

  cloneCostoDirectos(projId: number, newProjId: number): void {
    this.costosDirectos = this.getItem();
    let costosDirectosToClone = this.costosDirectos.filter(
      (CostoDirecto) => CostoDirecto.projectId == projId
    );
    let newId = this.costosDirectos.length + 1;
    costosDirectosToClone.forEach((costo) => {
      costo.id = newId;
      costo.projectId = newProjId;
      this.addCostoDirecto(costo);
      newId++;
    });
  }

  getCostoDirectoById(id: number): CostoDirecto {
    this.costosDirectos = this.getItem();
    return this.costosDirectos.filter(
      (CostoDirecto) => CostoDirecto.id == id
    )[0];
  }

  editCostoDirecto(CostoDirectoToEdit: CostoDirecto): void {
    this.costosDirectos = this.getItem();
    const indexToEdit = this.costosDirectos
      .map((CostoDirecto) => CostoDirecto.id)
      .indexOf(CostoDirectoToEdit.id);

    if (indexToEdit !== -1) {
      this.costosDirectos[indexToEdit] = CostoDirectoToEdit;
    }
    this.setItem(this.costosDirectos);
  }

  deleteCostoDirecto(CostoDirectoIdToDelete: number): void {
    this.costosDirectos = this.getItem();
    this.costosDirectos = this.costosDirectos.filter(
      (CostoDirecto) => CostoDirecto.id != CostoDirectoIdToDelete
    );
    this.setItem(this.costosDirectos);
  }

  deleteAllCostoDirectoByProj(projId: number): void {
    this.costosDirectos = this.getItem();
    this.costosDirectos = this.costosDirectos.filter(
      (CostoDirecto) => CostoDirecto.projectId != projId
    );
    this.setItem(this.costosDirectos);
  }

  getItem() {
    if (
      localStorage.getItem(TABLE_NAME) == "" ||
      localStorage.getItem(TABLE_NAME) == undefined
    ) {
      this.setItem([]);
    }
    return JSON.parse(localStorage.getItem(TABLE_NAME));
  }
  setItem(item: any) {
    localStorage.setItem(TABLE_NAME, JSON.stringify(item));
  }
}
