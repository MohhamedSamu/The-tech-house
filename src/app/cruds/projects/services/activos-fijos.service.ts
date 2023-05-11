import { Injectable } from "@angular/core";
import { ActivosFijos } from "app/interfaces/activos-fijos";

const TABLE_NAME = "activosFijos";

@Injectable({
  providedIn: "root",
})
export class ActivosFijosService {
  activosFijos: ActivosFijos[] = [
    {
      name: "Computadoras de desarrollo",
      porcentajeDepreciacion: 80,
      projectId: 1,
      valor: 3892.68,
      vidaUtil: 5,
      id: 1,
    },
    {
      name: "Mobiliario y equipo de oficina",
      porcentajeDepreciacion: 45,
      projectId: 1,
      valor: 2700,
      vidaUtil: 3,
      id: 2,
    },
    {
      name: "Vehículo de transporte e instalación de productos",
      porcentajeDepreciacion: 50,
      projectId: 1,
      valor: 9000,
      vidaUtil: 5,
      id: 3,
    },
    {
      name: "Oficina y Remodelación",
      porcentajeDepreciacion: 95,
      projectId: 1,
      valor: 322464,
      vidaUtil: 5,
      id: 4,
    },
    {
      name: "Computadoras de desarrollo",
      porcentajeDepreciacion: 80,
      projectId: 2,
      valor: 3892.68,
      vidaUtil: 5,
      id: 5,
    },
    {
      name: "Mobiliario y equipo de oficina",
      porcentajeDepreciacion: 45,
      projectId: 2,
      valor: 2700,
      vidaUtil: 3,
      id: 6,
    },
    {
      name: "Vehículo de transporte e instalación de productos",
      porcentajeDepreciacion: 50,
      projectId: 2,
      valor: 9000,
      vidaUtil: 5,
      id: 7,
    },
    {
      name: "Alquiler oficina",
      porcentajeDepreciacion: 0,
      projectId: 2,
      valor: 30000,
      vidaUtil: 5,
      id: 8,
    },
  ];

  constructor() {}

  addActivosFijo(newActivosFijo: ActivosFijos): void {
    this.activosFijos = this.getItem();
    newActivosFijo.id = this.activosFijos.length + 1;
    this.activosFijos.push(newActivosFijo);
    this.setItem(this.activosFijos);
  }

  getActivosFijos(projId: number): ActivosFijos[] {
    this.activosFijos = this.getItem();
    return this.activosFijos.filter(
      (ActivosFijo) => ActivosFijo.projectId == projId
    );
  }

  cloneActivosFijos(projId: number, newProjId: number): void {
    this.activosFijos = this.getItem();
    let activosFijosToClone = this.activosFijos.filter(
      (ActivosFijo) => ActivosFijo.projectId == projId
    );
    let newId = this.activosFijos.length + 1;
    activosFijosToClone.forEach((activo) => {
      activo.id = newId;
      activo.projectId = newProjId;
      this.addActivosFijo(activo);
      newId++;
    });
  }

  getActivosFijoById(id: number): ActivosFijos {
    this.activosFijos = this.getItem();
    return this.activosFijos.filter((ActivosFijo) => ActivosFijo.id == id)[0];
  }

  editActivosFijo(ActivosFijoToEdit: ActivosFijos): void {
    this.activosFijos = this.getItem();
    const indexToEdit = this.activosFijos
      .map((ActivosFijo) => ActivosFijo.id)
      .indexOf(ActivosFijoToEdit.id);

    if (indexToEdit !== -1) {
      this.activosFijos[indexToEdit] = ActivosFijoToEdit;
    }
    this.setItem(this.activosFijos);
  }

  deleteActivosFijo(ActivosFijoIdToDelete: number): void {
    this.activosFijos = this.getItem();
    this.activosFijos = this.activosFijos.filter(
      (ActivosFijo) => ActivosFijo.id != ActivosFijoIdToDelete
    );
    this.setItem(this.activosFijos);
  }

  deleteAllActivosFijoByProj(projId: number): void {
    this.activosFijos = this.getItem();
    this.activosFijos = this.activosFijos.filter(
      (ActivosFijo) => ActivosFijo.projectId != projId
    );
    this.setItem(this.activosFijos);
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
