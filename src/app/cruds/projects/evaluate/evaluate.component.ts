import { Component } from "@angular/core";
import { ProjectsService } from "../services/projects.service";
import { Router } from "@angular/router";
import { FullProjectInfo } from "app/interfaces/full-project-info";
import { UtilityService } from "app/cruds/utility.service";
import { ActivosFijosService } from "../services/activos-fijos.service";
import { CostoAdministrativoService } from "../services/costo-administrativo.service";
import { CostoDirectoService } from "../services/costo-directo.service";
import { CostoIndirectoService } from "../services/costo-indirecto.service";
import { IngresosService } from "../services/ingresos.service";

@Component({
  selector: "app-evaluate",
  templateUrl: "./evaluate.component.html",
  styleUrls: ["./evaluate.component.scss"],
})
export class EvaluateComponent {
  colapseState: boolean = false;

  projectInfo: FullProjectInfo = {
    project: null,
    activosFijosList: [],
    costosAdministrativosList: [],
    costosDirectosList: [],
    costosIndirectosList: [],
    ingresosList: [],
  };

  tempPorcentajeBanco: string = "0";
  tempPorcentajePropio: string = "0";

  cuotasFinanciamiento: any[] = [];
  amortizacionesAnuales: number[] = [];
  interesesAnuales: number[] = [];
  costosDeProduccion: any = {
    costosDirectos: null,
    costosIndirectos: null,
    totalCostosProduccion: null,
  };
  anios: any[] = [];

  costosDepreciacion: any = {
    activos: null,
    totales: null,
    totalesSalvamento: null,
  };

  costosDeAdministracion: any = {
    costos: null,
    totales: null,
  };

  ingresosTotales: any = {
    ingresosOptimistas: {
      ingresos: [],
      totales: [],
    },
    ingresosPromedios: {
      ingresos: [],
      totales: [],
    },
    ingresosPesimistas: {
      ingresos: [],
      totales: [],
    },
  };

  evaluacion: any = {
    optimista: {
      flujos: [],
      desiciones: {},
    },
    promedio: {
      flujos: [],
      desiciones: {},
    },
    pesimista: {
      flujos: [],
      desiciones: {},
    },
  };

  constructor(
    private projectService: ProjectsService,
    private router: Router,
    private utilityService: UtilityService
  ) {}

  ngOnInit() {
    let id = this.router.url.split("/")[this.router.url.split("/").length - 1];
    this.projectInfo = this.projectService.getFullProjectInfoById(+id);
    if (this.projectInfo.project != undefined) {
      console.log("this.projectInfo", this.projectInfo)
      this.tempPorcentajeBanco =
        (this.projectInfo.project.porcentajePrestamo * 100).toFixed(2) + "%";
      this.tempPorcentajePropio =
        (this.projectInfo.project.porcentajeCapitalPropio * 100).toFixed(2) +
        "%";

      if (this.projectInfo.project.totalPrestamo > 0) {
        if (this.projectInfo.project.tasaInteresBanco == 0) {
          this.router.navigate([
            "/cruds/projects/edit",
            this.projectInfo.project.id,
          ]);
          this.utilityService.showNotification(
            4,
            "Es necesario ingresar la tasa de interes del banco antes de continuar con la evaluacion"
          );
          return;
        }
        if (this.projectInfo.project.tiempoPrestamo == 0) {
          this.router.navigate([
            "/cruds/projects/edit",
            this.projectInfo.project.id,
          ]);
          this.utilityService.showNotification(
            4,
            "Es necesario ingresar el tiempo del prestamo antes de continuar con la evaluacion"
          );
          return;
        }
        this.cuotasFinanciamiento = this.utilityService.makeCostoFinanciamiento(
          this.projectInfo.project.tasaInteresBanco,
          this.projectInfo.project.tiempoPrestamo,
          this.projectInfo.project.totalPrestamo
        );
        this.amortizacionesAnuales = this.utilityService.getAmortizacion(
          this.cuotasFinanciamiento
        );
        this.interesesAnuales = this.utilityService.getIntereses(
          this.cuotasFinanciamiento
        );
      }

      this.costosDeProduccion = this.utilityService.makeCostosProduccion(
        this.projectInfo.costosDirectosList,
        this.projectInfo.costosIndirectosList,
        this.projectInfo.project.tiempoPrestamo
      );
      this.anios = [];
      for (
        let index = 1;
        index <= this.projectInfo.project.tiempoPrestamo;
        index++
      ) {
        this.anios.push(index);
      }
      this.costosDepreciacion = this.utilityService.calcDepreciacion(
        this.projectInfo.activosFijosList,
        this.projectInfo.project.tiempoPrestamo
      );

      this.costosDeAdministracion = this.utilityService.calcCostos(
        this.projectInfo.costosAdministrativosList,
        this.projectInfo.project.tiempoPrestamo
      );

      this.ingresosTotales = this.utilityService.calcIngresos(
        this.projectInfo.ingresosList,
        this.projectInfo.project.tiempoPrestamo
      );

      this.evaluacion.optimista.flujos = this.utilityService.makeFlujoFondos(
        this.ingresosTotales.ingresosOptimistas.totales,
        this.costosDeProduccion.totalCostosProduccion,
        this.costosDeAdministracion.totales,
        this.interesesAnuales,
        this.amortizacionesAnuales,
        this.costosDepreciacion.totales,
        this.costosDepreciacion.totalesSalvamento,
        this.projectInfo.project.tasaImpuesto,
        this.projectInfo.project.tiempoPrestamo
      );
      this.evaluacion.promedio.flujos = this.utilityService.makeFlujoFondos(
        this.ingresosTotales.ingresosPromedios.totales,
        this.costosDeProduccion.totalCostosProduccion,
        this.costosDeAdministracion.totales,
        this.interesesAnuales,
        this.amortizacionesAnuales,
        this.costosDepreciacion.totales,
        this.costosDepreciacion.totalesSalvamento,
        this.projectInfo.project.tasaImpuesto,
        this.projectInfo.project.tiempoPrestamo
      );
      this.evaluacion.pesimista.flujos = this.utilityService.makeFlujoFondos(
        this.ingresosTotales.ingresosPesimistas.totales,
        this.costosDeProduccion.totalCostosProduccion,
        this.costosDeAdministracion.totales,
        this.interesesAnuales,
        this.amortizacionesAnuales,
        this.costosDepreciacion.totales,
        this.costosDepreciacion.totalesSalvamento,
        this.projectInfo.project.tasaImpuesto,
        this.projectInfo.project.tiempoPrestamo
      );

      this.evaluacion.optimista.desiciones = this.utilityService.makeDesicion(
        this.evaluacion.optimista.flujos.flujoNetoTotal,
        this.projectInfo.project.totalCapitalPropio,
        this.projectInfo.project.tasaInteresBanco,
        this.projectInfo.project.tiempoPrestamo,
        this.projectInfo.project.tmar
      );
      this.evaluacion.promedio.desiciones = this.utilityService.makeDesicion(
        this.evaluacion.promedio.flujos.flujoNetoTotal,
        this.projectInfo.project.totalCapitalPropio,
        this.projectInfo.project.tasaInteresBanco,
        this.projectInfo.project.tiempoPrestamo,
        this.projectInfo.project.tmar
      );
      this.evaluacion.pesimista.desiciones = this.utilityService.makeDesicion(
        this.evaluacion.pesimista.flujos.flujoNetoTotal,
        this.projectInfo.project.totalCapitalPropio,
        this.projectInfo.project.tasaInteresBanco,
        this.projectInfo.project.tiempoPrestamo,
        this.projectInfo.project.tmar
      );
    } else {
      this.router.navigate(["/cruds/projects"]);
    }
  }

  editProject() {
    this.router.navigate(["/cruds/projects/edit", this.projectInfo.project.id]);
  }

  onProjChange() {
    this.projectService.editProject(this.projectInfo.project);
    this.ngOnInit();
  }
}
