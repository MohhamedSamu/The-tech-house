import { Injectable } from '@angular/core';
import { Ingreso } from '../../../interfaces/ingreso'
import { UtilityService } from 'app/cruds/utility.service';

const TABLE_NAME = "ingresos";

@Injectable({
  providedIn: 'root'
})
export class IngresosService {
  ingresos: Ingreso[] = [];

  constructor(private utilityService: UtilityService) { }

  addIngreso(newIngreso: Ingreso): void
  {
    this.ingresos = this.getItem();
    newIngreso.id = this.ingresos.length + 1;
    this.ingresos.push(newIngreso);
    this.setItem(this.ingresos);
  }

  getIngresos(projId : number): Ingreso[]
  {
    this.ingresos = this.getItem();
    return this.ingresos.filter((Ingreso) => Ingreso.projectId == projId);
  }

  cloneIngresos(projId : number): void
  {
    this.ingresos = this.getItem();
    let ingresosToClone = this.ingresos.filter((Ingreso) => Ingreso.projectId == projId);
    this.ingresos = [...this.ingresos, ...ingresosToClone];
    this.setItem(this.ingresos);
  }

  getIngresoById(id: number): Ingreso
  {
    this.ingresos = this.getItem();
    return this.ingresos.filter((Ingreso) => Ingreso.id == id)[0];
  }

  editIngreso(IngresoToEdit: Ingreso): void
  {
    this.ingresos = this.getItem();
    const indexToEdit = this.ingresos.map(Ingreso => Ingreso.id).indexOf(IngresoToEdit.id);

    if (indexToEdit !== -1) {
      this.ingresos[indexToEdit] = IngresoToEdit;
    }
    this.setItem(this.ingresos);
  }

  deleteIngreso(IngresoIdToDelete: number): void
  {
    this.ingresos = this.getItem();
    this.ingresos = this.ingresos.filter((Ingreso) => Ingreso.id != IngresoIdToDelete);
    this.setItem(this.ingresos);
  }

  deleteAllIngresoByProj(projId: number): void
  {
    this.ingresos = this.getItem();
    this.ingresos = this.ingresos.filter((Ingreso) => Ingreso.projectId != projId);
    this.setItem(this.ingresos);
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
