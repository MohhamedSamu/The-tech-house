import { Injectable } from "@angular/core";
import { Project } from "app/interfaces/project";
import { ActivosFijosService } from "./activos-fijos.service";
import { CostoAdministrativoService } from "./costo-administrativo.service";
import { CostoDirectoService } from "./costo-directo.service";
import { CostoIndirectoService } from "./costo-indirecto.service";
import { IngresosService } from "./ingresos.service";
import { FullProjectInfo } from "app/interfaces/full-project-info";

const TABLE_NAME = "projects";

@Injectable({
  providedIn: "root",
})
export class ProjectsService {
  projects: Project[] = [
    {
      name: "TheTechHouse - Acaces - con compra de inmueble",
      canBeEvaluated: true,
      tmar: 16,
      totalActivosFijos: 338056.68,
      porcentajeCapitalPropio: 0.11832335335009503,
      totalCapitalPropio: 40000,
      porcentajePrestamo: 0.881676646649905,
      totalPrestamo: 298056.68,
      tasaInteresBanco: 15,
      tiempoPrestamo: 5,
      tasaImpuesto: 25,
      id: 1,
    },
    {
      name: "TheTechHouse - Acaces - con alquiler",
      canBeEvaluated: true,
      tmar: 16,
      totalActivosFijos: 45592.68,
      porcentajeCapitalPropio: 0.8773338176216007,
      totalCapitalPropio: 40000,
      porcentajePrestamo: 0.12266618237839934,
      totalPrestamo: 5592.68,
      tasaInteresBanco: 15,
      tiempoPrestamo: 5,
      tasaImpuesto: 25,
      id: 2,
    },
  ];

  constructor(
    private activosFijosService: ActivosFijosService,
    private CostoAdministrativoService: CostoAdministrativoService,
    private CostoDirectoService: CostoDirectoService,
    private CostoIndirectoService: CostoIndirectoService,
    private IngresosService: IngresosService
  ) {}

  addProject(newProject: Project): void {
    this.projects = this.getItem();
    newProject.id = this.projects.length + 1;
    this.projects.push(newProject);
    this.setItem(this.projects);
  }
  cloneProject(projectIdToClone: number): void {
    this.projects = this.getItem();
    let projectToClone = JSON.parse(
      JSON.stringify(this.getProjectById(projectIdToClone))
    );

    projectToClone.id = this.projects.length + 1;
    projectToClone.name = "Copia de " + projectToClone.name;
    this.addProject(projectToClone);
    this.activosFijosService.cloneActivosFijos(
      projectIdToClone,
      projectToClone.id
    );
    this.CostoAdministrativoService.cloneCostoAdministrativos(
      projectIdToClone,
      projectToClone.id
    );
    this.CostoDirectoService.cloneCostoDirectos(
      projectIdToClone,
      projectToClone.id
    );
    this.CostoIndirectoService.cloneActivosFijos(
      projectIdToClone,
      projectToClone.id
    );
    this.IngresosService.cloneIngresos(projectIdToClone, projectToClone.id);
  }

  getProjects(): Project[] {
    console.log('here')
    return this.getItem();
  }

  getProjectById(id: number): Project {
    this.projects = this.getItem();
    return this.projects.filter((proj) => proj.id == id)[0];
  }

  getFullProjectInfoById(id: number): FullProjectInfo {
    let fullProj: FullProjectInfo = {
      project: this.getProjectById(id),
      activosFijosList: this.activosFijosService.getActivosFijos(id),
      costosAdministrativosList:
        this.CostoAdministrativoService.getCostoAdministrativos(id),
      costosDirectosList: this.CostoDirectoService.getCostoDirectos(id),
      costosIndirectosList: this.CostoIndirectoService.getActivosFijos(id),
      ingresosList: this.IngresosService.getIngresos(id),
    };
    return fullProj;
  }

  editProject(projectToEdit: Project): void {
    this.projects = this.getItem();
    const indexToEdit = this.projects
      .map((proj) => proj.id)
      .indexOf(projectToEdit.id);

    if (indexToEdit !== -1) {
      this.projects[indexToEdit] = projectToEdit;
    }
    this.setItem(this.projects);
  }

  deleteProject(projectIdToDelete: number): void {
    this.projects = this.getItem();
    this.projects = this.projects.filter(
      (proj) => proj.id != projectIdToDelete
    );
    this.setItem(this.projects);
    this.activosFijosService.deleteAllActivosFijoByProj(projectIdToDelete);
    this.CostoAdministrativoService.deleteAllCostoAdministrativoByProj(
      projectIdToDelete
    );
    this.CostoDirectoService.deleteAllCostoDirectoByProj(projectIdToDelete);
    this.CostoIndirectoService.deleteAllActivosFijoByProj(projectIdToDelete);
    this.IngresosService.deleteAllIngresoByProj(projectIdToDelete);
  }

  actualizarValores(project: Project): void {
    project.totalActivosFijos = this.activosFijosService
      .getActivosFijos(project.id)
      .reduce((a, b) => a + (b["valor"] || 0), 0);
    if (project.totalActivosFijos > project.totalCapitalPropio) {
      project.porcentajeCapitalPropio =
        project.totalCapitalPropio / project.totalActivosFijos;
      project.totalPrestamo =
        project.totalActivosFijos - project.totalCapitalPropio;
      project.porcentajePrestamo =
        project.totalPrestamo / project.totalActivosFijos;
    } else {
      project.porcentajeCapitalPropio = 1;
      project.totalPrestamo = 0;
      project.porcentajePrestamo = 0;
    }
    this.editProject(project);
  }

  getItem() {
    if (
      localStorage.getItem(TABLE_NAME) == "" ||
      localStorage.getItem(TABLE_NAME) == undefined
    ) {
      this.setItem(this.projects);
    }
    return JSON.parse(localStorage.getItem(TABLE_NAME));
  }
  setItem(item: any) {
    localStorage.setItem(TABLE_NAME, JSON.stringify(item));
  }
}
