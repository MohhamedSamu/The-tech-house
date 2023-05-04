import { Component } from "@angular/core";
import { Project } from "app/interfaces/project";
import { ProjectsService } from "../services/projects.service";
import { Router } from "@angular/router";
import { UtilityService } from "app/cruds/utility.service";
import { ActivosFijos } from "app/interfaces/activos-fijos";
import { ActivosFijosService } from "../services/activos-fijos.service";

@Component({
  selector: "app-new",
  templateUrl: "./new.component.html",
  styleUrls: ["./new.component.scss"],
})
export class NewComponent {
  project: Project = {
    name : "",
    tmar : 0,
    totalActivosFijos : 0,
    porcentajeCapitalPropio : 0,
    totalCapitalPropio : 0,
    porcentajePrestamo : 0,
    totalPrestamo : 0,
    tasaInteresBanco : 0,
    tiempoPrestamo : 0,
    tasaImpuesto : 0,
  };
  createdState: boolean = false;
  newActivoFijo: ActivosFijos = {
    name: "Activo",
    porcentajeDepreciacion:0,
    projectId: 0,
    valor:0,
    vidaUtil:0,
  };
  activosFijosList : ActivosFijos[] = [];

  constructor(
    private projectService: ProjectsService,
    private router: Router,
    private utilityService:UtilityService,
    private activosFijosService: ActivosFijosService
  ) {}

  ngOnInit() {
    if (this.router.url.includes("edit")) {
      let id =
        this.router.url.split("/")[this.router.url.split("/").length - 1];
      this.project = this.projectService.getProjectById(+id);
      this.activosFijosList = this.activosFijosService.getActivosFijos(+id);
      this.createdState = true;
    }
  }

  onSubmit() {
    if (this.project.name == "") {
      this.utilityService.showNotification(4, "Nombre de proyecto es obligatorio")
    } else {
      if (this.project.id != null){
        this.projectService.editProject(this.project);
        this.utilityService.showNotification(2, "Proyecto editado con exito")
      }else{
        this.projectService.addProject(this.project);
        this.utilityService.showNotification(2, "Proyecto creado con exito");
        this.router.navigate(['/cruds/projects/edit', this.project.id])
      }
    }
  }

  onSubmitNewActivoFijo() {
    if (this.newActivoFijo.name == "") {
      this.utilityService.showNotification(4, "Nombre de activo fijo es obligatorio")
    } else if (this.newActivoFijo.valor == 0) {
      this.utilityService.showNotification(4, "Valor de activo fijo es obligatorio")
    } else {
      if (this.newActivoFijo.id != null){
        this.activosFijosService.editActivosFijo(this.newActivoFijo);
        this.utilityService.showNotification(2, "Activo fijo editado con exito")
      }else{
        this.newActivoFijo.projectId = this.project.id;
        this.activosFijosService.addActivosFijo(this.newActivoFijo);
        this.utilityService.showNotification(2, "Activo fijo creado con exito")
      }
      this.projectService.actualizarValores(this.project);
      this.ngOnInit();
      this.newActivoFijo = {
        name: "Activo",
        porcentajeDepreciacion:0,
        projectId: 0,
        valor:0,
        vidaUtil:0,
      };
    }
  }

  clearNewActivoFijo(){
    this.newActivoFijo = {
      name: "Activo",
      porcentajeDepreciacion:0,
      projectId: 0,
      valor:0,
      vidaUtil:0,
    };
  }

  editActivo(id:number){
    this.newActivoFijo = this.activosFijosService.getActivosFijoById(id);
  }
  deleteActivo(id:number){
    this.activosFijosService.deleteActivosFijo(id);
    this.ngOnInit();
  }

  
}
