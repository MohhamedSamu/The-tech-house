import { Injectable } from "@angular/core";
import { Ingreso } from "../../../interfaces/ingreso";
import { UtilityService } from "app/cruds/utility.service";

const TABLE_NAME = "ingresos";

@Injectable({
  providedIn: "root",
})
export class IngresosService {
  ingresos: Ingreso[] = [
    {
      incrementoAnual: 50,
      name: "Venta de producto individual",
      projectId: 1,
      valorOptimista: 143479.2,
      valorPesimista: 35869.8,
      id: 1,
    },
    {
      incrementoAnual: 50,
      name: "Instalaciones del servicio",
      projectId: 1,
      valorOptimista: 30130.63,
      valorPesimista: 7532.65,
      id: 2,
    },
    {
      incrementoAnual: 50,
      name: "Membresías mensuales",
      projectId: 1,
      valorOptimista: 39000,
      valorPesimista: 9750,
      id: 3,
    },
    {
      incrementoAnual: 50,
      name: "Reparaciones ",
      projectId: 1,
      valorOptimista: 10760.94,
      valorPesimista: 4304.37,
      id: 4,
    },
    {
      incrementoAnual: 50,
      name: "Venta de producto individual",
      projectId: 2,
      valorOptimista: 143479.2,
      valorPesimista: 35869.8,
      id: 5,
    },
    {
      incrementoAnual: 50,
      name: "Instalaciones del servicio",
      projectId: 2,
      valorOptimista: 30130.63,
      valorPesimista: 7532.65,
      id: 6,
    },
    {
      incrementoAnual: 50,
      name: "Membresías mensuales",
      projectId: 2,
      valorOptimista: 39000,
      valorPesimista: 9750,
      id: 7,
    },
    {
      incrementoAnual: 50,
      name: "Reparaciones ",
      projectId: 2,
      valorOptimista: 10760.94,
      valorPesimista: 4304.37,
      id: 8,
    },
  ];

  constructor(private utilityService: UtilityService) {}

  addIngreso(newIngreso: Ingreso): void {
    this.ingresos = this.getItem();
    newIngreso.id = this.ingresos.length + 1;
    this.ingresos.push(newIngreso);
    this.setItem(this.ingresos);
  }

  getIngresos(projId: number): Ingreso[] {
    this.ingresos = this.getItem();
    return this.ingresos.filter((Ingreso) => Ingreso.projectId == projId);
  }

  cloneIngresos(projId: number, newProjId: number): void {
    this.ingresos = this.getItem();
    let ingresosToClone = this.ingresos.filter(
      (Ingreso) => Ingreso.projectId == projId
    );
    let newId = this.ingresos.length + 1;
    ingresosToClone.forEach((ingreso) => {
      ingreso.id = newId;
      ingreso.projectId = newProjId;
      this.addIngreso(ingreso);
      newId++;
    });
  }

  getIngresoById(id: number): Ingreso {
    this.ingresos = this.getItem();
    return this.ingresos.filter((Ingreso) => Ingreso.id == id)[0];
  }

  editIngreso(IngresoToEdit: Ingreso): void {
    this.ingresos = this.getItem();
    const indexToEdit = this.ingresos
      .map((Ingreso) => Ingreso.id)
      .indexOf(IngresoToEdit.id);

    if (indexToEdit !== -1) {
      this.ingresos[indexToEdit] = IngresoToEdit;
    }
    this.setItem(this.ingresos);
  }

  deleteIngreso(IngresoIdToDelete: number): void {
    this.ingresos = this.getItem();
    this.ingresos = this.ingresos.filter(
      (Ingreso) => Ingreso.id != IngresoIdToDelete
    );
    this.setItem(this.ingresos);
  }

  deleteAllIngresoByProj(projId: number): void {
    this.ingresos = this.getItem();
    this.ingresos = this.ingresos.filter(
      (Ingreso) => Ingreso.projectId != projId
    );
    this.setItem(this.ingresos);
  }

  getItem() {
    if (
      localStorage.getItem(TABLE_NAME) == "" ||
      localStorage.getItem(TABLE_NAME) == undefined
    ) {
      this.setItem(this.ingresos);
    }
    return JSON.parse(localStorage.getItem(TABLE_NAME));
  }
  setItem(item: any) {
    localStorage.setItem(TABLE_NAME, JSON.stringify(item));
  }
}
