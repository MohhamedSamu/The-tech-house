import { Component } from "@angular/core";
import { Project } from "app/interfaces/project";
import { ProjectsService } from "../services/projects.service";
import { Router } from "@angular/router";
import { UtilityService } from "app/cruds/utility.service";
import { ActivosFijos } from "app/interfaces/activos-fijos";
import { ActivosFijosService } from "../services/activos-fijos.service";
import { CostoAdministrativo } from "app/interfaces/costo-administrativo";
import { CostoDirecto } from "app/interfaces/costo-directo";
import { CostoIndirecto } from "app/interfaces/costo-indirecto";
import { Ingreso } from "app/interfaces/ingreso";
import { CostoDirectoService } from "../services/costo-directo.service";
import { CostoIndirectoService } from "../services/costo-indirecto.service";
import { IngresosService } from "../services/ingresos.service";
import { CostoAdministrativoService } from "../services/costo-administrativo.service";

@Component({
  selector: "app-new",
  templateUrl: "./new.component.html",
  styleUrls: ["./new.component.scss"],
})
export class NewComponent {
  colapseState: boolean = false;
  project: Project = {
    name : "",
    canBeEvaluated : false,
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
  tempPorcentajePropio:string = "0";
  tempPorcentajeBanco:string = "0";
  createdState: boolean = false;
  newActivoFijo: ActivosFijos = {
    name: "",
    porcentajeDepreciacion:0,
    projectId: 0,
    valor:0,
    vidaUtil:0,
  };
  activosFijosList : ActivosFijos[] = [];
  newCostoAdministrativo: CostoAdministrativo = {
    incrementoAnual: 0,
    name: "",
    projectId:0,
    valor:0,
  }
  costosAdministrativosList:CostoAdministrativo[] = [];
  newCostoDirecto:CostoDirecto= {
    incrementoAnual:0,
    name:"",
    projectId:0,
    valor:0,
  }
  costosDirectosList:CostoDirecto[]=[];
  newCostoIndirecto:CostoIndirecto={
    incrementoAnual:0,
    name:"",
    projectId:0,
    valor:0,
  }
  costosIndirectosList:CostoIndirecto[]=[];
  newIngreso:Ingreso={
    incrementoAnual:0,
    name:"",
    projectId:0,
    valorOptimista:0,
    valorPesimista:0,
  }
  ingresosList:Ingreso[]=[]
  constructor(
    private projectService: ProjectsService,
    private router: Router,
    private utilityService:UtilityService,
    private ActivosFijosService: ActivosFijosService,
    private CostoAdministrativoService: CostoAdministrativoService,
    private CostoDirectoService: CostoDirectoService,
    private CostoIndirectoService: CostoIndirectoService,
    private IngresosService: IngresosService,
  ) {}

  ngOnInit() { //funcion lista
    if (this.router.url.includes("edit")) {
      let id =
        this.router.url.split("/")[this.router.url.split("/").length - 1];
        // this.project = this.projectService.getProjectById(+id);
        this.projectService.getProjectByIdd(id).subscribe(
          res => {
            this.project = res;
            if (this.project != undefined){
              this.tempPorcentajeBanco = (this.project.porcentajePrestamo * 100).toFixed(2) + "%"
              this.tempPorcentajePropio = (this.project.porcentajeCapitalPropio * 100).toFixed(2) + "%"
              this.activosFijosList = this.ActivosFijosService.getActivosFijos(+id);
              this.costosAdministrativosList = this.CostoAdministrativoService.getCostoAdministrativos(+id);
              this.costosDirectosList = this.CostoDirectoService.getCostoDirectos(+id);
              this.costosIndirectosList = this.CostoIndirectoService.getActivosFijos(+id);
              this.ingresosList = this.IngresosService.getIngresos(+id);
              this.createdState = true;
              if ( 
                this.activosFijosList.length > 0 &&
                this.costosAdministrativosList.length > 0 &&
                this.costosDirectosList.length > 0 &&
                this.costosIndirectosList.length > 0 &&
                this.ingresosList.length > 0
              ){
                this.project.canBeEvaluated = true;
                this.projectService.editProject(this.project)
              }
            }else{
              this.project = {
                name : "",
                canBeEvaluated : false,
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
            }
          }
        )
    }
  }

  onSubmit() { // Funcion lista
    if (this.project.name == "") {
      this.utilityService.showNotification(4, "Nombre de proyecto es obligatorio")
    } else {
      if (this.project.id != null){
        this.projectService.editarProject(this.project).subscribe(
          res => {
            console.log(res);
            this.utilityService.showNotification(2, "Proyecto editado con exito")
          }
        );
        //this.projectService.editProject(this.project);
        
      }else{
        this.projectService.agregarProject(this.project).subscribe(
          res => {
            console.log(res);
            this.project = res;
            this.utilityService.showNotification(2, "Proyecto creado con exito");
            this.router.navigate(['/cruds/projects/edit', this.project.id])
          }
        );
        //this.projectService.addProject(this.project);
      }
    }
  }

  evaluateProject(){
    this.router.navigate(['/cruds/projects/evaluate', this.project.id])
  }

  onCapitalChange(){ // Funcion lista
    if (this.createdState){
      this.projectService.actualizarValores(this.project);
      this.ngOnInit();
    }
  }

  onSubmitNewActivoFijo() {
    if (this.newActivoFijo.name == "") {
      this.utilityService.showNotification(4, "Nombre de activo fijo es obligatorio")
    } else if (this.newActivoFijo.valor == 0) {
      this.utilityService.showNotification(4, "Valor de activo fijo es obligatorio")
    } else {
      if (this.newActivoFijo.id != null){
        this.ActivosFijosService.editActivosFijo(this.newActivoFijo);
        this.utilityService.showNotification(2, " fijo editado con exito")
      }else{
        this.newActivoFijo.projectId = this.project.id;
        this.ActivosFijosService.addActivosFijo(this.newActivoFijo);
        this.utilityService.showNotification(2, " fijo creado con exito")
      }
      this.projectService.actualizarValores(this.project);
      this.ngOnInit();
      this.newActivoFijo = {
        name: "",
        porcentajeDepreciacion:0,
        projectId: 0,
        valor:0,
        vidaUtil:0,
      };
    }
  }

  clearNewActivoFijo(){
    this.newActivoFijo = {
      name: "",
      porcentajeDepreciacion:0,
      projectId: 0,
      valor:0,
      vidaUtil:0,
    };
  }

  editActivo(id:number){
    console.log("id", id)
    this.newActivoFijo = this.ActivosFijosService.getActivosFijoById(id);
  }
  deleteActivo(id:number){
    this.ActivosFijosService.deleteActivosFijo(id);
    this.ngOnInit();
  }

  onSubmitNewCostoAdministrativo() {
    if (this.newCostoAdministrativo.name == "") {
      this.utilityService.showNotification(4, "Nombre de costo administrativo es obligatorio")
    } else if (this.newCostoAdministrativo.valor == 0) {
      this.utilityService.showNotification(4, "Valor de costo administrativo es obligatorio")
    } else {
      if (this.newCostoAdministrativo.id != null){
        this.CostoAdministrativoService.editCostoAdministrativo(this.newCostoAdministrativo);
        this.utilityService.showNotification(2, "costo administrativo editado con exito")
      }else{
        this.newCostoAdministrativo.projectId = this.project.id;
        this.CostoAdministrativoService.addCostoAdministrativo(this.newCostoAdministrativo);
        this.utilityService.showNotification(2, "costo administrativo creado con exito")
      }
      this.projectService.actualizarValores(this.project);
      this.ngOnInit();
      this.newCostoAdministrativo = {
        name: "",
        projectId: 0,
        valor:0,
        incrementoAnual:0,
      };
    }
  }

  clearNewCostoAdministrativo(){
    this.newCostoAdministrativo = {
      name: "",
      projectId: 0,
      valor:0,
      incrementoAnual:0,
    };
  }

  editCostoAdmin(id:number){
    this.newCostoAdministrativo = this.CostoAdministrativoService.getCostoAdministrativoById(id);
  }
  deleteCostoAdmin(id:number){
    this.CostoAdministrativoService.deleteCostoAdministrativo(id);
    this.ngOnInit();
  }

  onSubmitNewCostoDirecto() {
    if (this.newCostoDirecto.name == "") {
      this.utilityService.showNotification(4, "Nombre de costo directo es obligatorio")
    } else if (this.newCostoDirecto.valor == 0) {
      this.utilityService.showNotification(4, "Valor de costo directo es obligatorio")
    } else {
      if (this.newCostoDirecto.id != null){
        this.CostoDirectoService.editCostoDirecto(this.newCostoDirecto);
        this.utilityService.showNotification(2, "costo directo editado con exito")
      }else{
        this.newCostoDirecto.projectId = this.project.id;
        this.CostoDirectoService.addCostoDirecto(this.newCostoDirecto);
        this.utilityService.showNotification(2, "costo directo creado con exito")
      }
      this.projectService.actualizarValores(this.project);
      this.ngOnInit();
      this.newCostoDirecto = {
        name: "",
        projectId: 0,
        valor:0,
        incrementoAnual:0,
      };
    }
  }

  clearNewCostoDirecto(){ 
    this.newCostoDirecto = {
      name: "",
      projectId: 0,
      valor:0,
      incrementoAnual:0,
    };
  }

  editNewCostoDirecto(id:number){
    this.newCostoDirecto = this.CostoDirectoService.getCostoDirectoById(id);
  }
  deleteCostoDirecto(id:number){
    this.CostoDirectoService.deleteCostoDirecto(id);
    this.ngOnInit();
  }

  onSubmitCostoIndirecto() {
    if (this.newCostoIndirecto.name == "") {
      this.utilityService.showNotification(4, "Nombre de costo indirecto es obligatorio")
    } else if (this.newCostoIndirecto.valor == 0) {
      this.utilityService.showNotification(4, "Valor de costo indirecto es obligatorio")
    } else {
      if (this.newCostoIndirecto.id != null){
        this.CostoIndirectoService.editActivosFijo(this.newCostoIndirecto);
        this.utilityService.showNotification(2, "costo indirecto editado con exito")
      }else{
        this.newCostoIndirecto.projectId = this.project.id;
        this.CostoIndirectoService.addActivosFijo(this.newCostoIndirecto);
        this.utilityService.showNotification(2, "costo indirecto creado con exito")
      }
      this.projectService.actualizarValores(this.project);
      this.ngOnInit();
      this.newCostoIndirecto = {
        name: "",
        projectId: 0,
        valor:0,
        incrementoAnual:0,
      };
    }
  }

  clearNewCostoIndirecto(){ 
    this.newCostoIndirecto = {
      name: "",
      projectId: 0,
      valor:0,
      incrementoAnual:0,
    };
  }

  editCostoIndirecto(id:number){
    this.newCostoIndirecto = this.CostoIndirectoService.getActivosFijoById(id);
  }
  deleteCostoIndirecto(id:number){
    this.CostoIndirectoService.deleteActivosFijo(id);
    this.ngOnInit();
  }

  onSubmitIngreso() {
    if (this.newIngreso.name == "") {
      this.utilityService.showNotification(4, "Nombre del ingreso es obligatorio")
    } else if (this.newIngreso.valorOptimista == 0) {
      this.utilityService.showNotification(4, "Valor Optimista del ingreso es obligatorio")
    } else if (this.newIngreso.valorPesimista == 0) {
      this.utilityService.showNotification(4, "Valor Pesimista del ingreso es obligatorio")
    } else {
      if (this.newIngreso.id != null){
        this.IngresosService.editIngreso(this.newIngreso);
        this.utilityService.showNotification(2, "ingreso editado con exito")
      }else{
        this.newIngreso.projectId = this.project.id;
        this.IngresosService.addIngreso(this.newIngreso);
        this.utilityService.showNotification(2, "ingreso creado con exito")
      }
      this.projectService.actualizarValores(this.project);
      this.ngOnInit();
      this.newIngreso = {
        incrementoAnual:0,
        name:"",
        projectId:0,
        valorOptimista:0,
        valorPesimista:0,
      };
    }
  }
  
  clearNewIngreso(){ 
    this.newIngreso = {
      incrementoAnual:0,
      name:"",
      projectId:0,
      valorOptimista:0,
      valorPesimista:0,
    };
  }

  editIngreso(id:number){
    this.newIngreso = this.IngresosService.getIngresoById(id);
  }
  deleteIngreso(id:number){
    this.IngresosService.deleteIngreso(id);
    this.ngOnInit();
  }
}
