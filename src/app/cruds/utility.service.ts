import { Injectable } from '@angular/core';
import { ActivosFijos } from 'app/interfaces/activos-fijos';
import { CostoDirecto } from 'app/interfaces/costo-directo';
import { CostoIndirecto } from 'app/interfaces/costo-indirecto';
import { Ingreso } from 'app/interfaces/ingreso';

declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

/***
 * showNotification
 * 1 -> info
 * 2 -> success
 * 3 -> warning
 * 4 -> danger
 */

  showNotification(color, message) {
    const type = ["", "info", "success", "warning", "danger"];

    $.notify(
      {
        icon: "notifications",
        message: message,
      },
      {
        type: type[color],
        timer: 4000,
        placement: {
          from: "top",
          align: "right",
        },
        template:
          '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          "</div>" +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          "</div>",
      }
    );
  }

  makeCostoFinanciamiento(tasaInteresBanco:number, n:number, totalPrestamo:number):any[]{
    let i = tasaInteresBanco / 100;
    let cuotaAnual = totalPrestamo * ( (i * (Math.pow((1+i), n))) / (Math.pow((1+i),n) - 1));
    let j = 1;
    let saldoInicial = +(totalPrestamo).toFixed(2);
    let cuotasFinanciamiento:any[]=[];
    do{

      let cuota = {
        n: j,
        saldoInicial: +(saldoInicial).toFixed(2),
        costoAnual: +(cuotaAnual).toFixed(2),
        intereses: +(saldoInicial * i).toFixed(2),
        amortizacion: +(cuotaAnual - (saldoInicial * i)).toFixed(2),
        saldoFinal: +(saldoInicial - (cuotaAnual - (saldoInicial * i))).toFixed(2)
      }

      cuotasFinanciamiento.push(cuota);
      saldoInicial = cuota.saldoFinal
      j++;
    }while(saldoInicial > 1);
    return cuotasFinanciamiento;
  }

  getIntereses(cuotasFinanciamiento: any[]){
    let interesesAnuales = [];
    cuotasFinanciamiento.forEach((cuota) => {
      interesesAnuales.push(cuota.intereses)
    })
    return interesesAnuales;
  }

  getAmortizacion(cuotasFinanciamiento: any[]){
    let amortizacionesAnuales = [];
    cuotasFinanciamiento.forEach((cuota) => {
      amortizacionesAnuales.push(cuota.amortizacion)
    })
    return amortizacionesAnuales;
  }

  makeCostosProduccion(costosDirectos:CostoDirecto[], costosIndirectos:CostoIndirecto[], n:number):any{
    let directos = this.calcCostos(costosDirectos, n);
    let indirectos = this.calcCostos(costosIndirectos, n);
    let totales = this.calcTotales(directos.totales, indirectos.totales, n);

    return {
      costosDirectos: directos,
      costosIndirectos: indirectos,
      totalCostosProduccion: totales,
    }
  }
  calcCostos(costosDirectos:any[], n:number):any{
    let costos = [];
    let totales = [];
    costosDirectos.forEach((costo) => {
      let anualidades = [];
      let anualidad = costo.valor;
      for (let i = 0; i < n; i++){
        anualidades.push(anualidad);
        if (totales[i] == undefined ){
          totales[i] = anualidad
        }else{
          totales[i] = totales[i] + anualidad;
        }
        anualidad = anualidad * (1 + (costo.incrementoAnual / 100))
      }

      costos.push({
        name: costo.name,
        incremento: costo.incrementoAnual,
        anualidades: anualidades
      })
    })
    return {
      costos: costos,
      totales: totales
    };
  }

  private calcTotales(totalesDirectos:any[],totalesIndirectos:any[], n:number):any[]{
    let totales = []
    for (let i = 0; i < n; i++){
      totales[i] = totalesDirectos[i] + totalesIndirectos[i];
    }
    return totales
  }

  calcDepreciacion(activosFijos:ActivosFijos[], n:number):any{
    let activos = [];
    let totales = [];
    let totalesSalvamento = [];
    for (let i = 0; i < n; i++){
      totalesSalvamento.push({
        n: i+1,
        valor:0
      });
    }
    console.log("activosFijos", activosFijos)
    activosFijos = activosFijos.filter((activo) => activo.porcentajeDepreciacion != 0);
    activosFijos.forEach((activo) => {
      let anualidades = [];
      let valorRescate = (activo.valor * (activo.porcentajeDepreciacion/100))
      let anualidad = (activo.valor - valorRescate) / activo.vidaUtil;
      for (let i = 0; i < activo.vidaUtil; i++){
        anualidades.push(anualidad);
        if (totales[i] == undefined ){
          totales[i] = anualidad
        }else{
          totales[i] = totales[i] + anualidad;
        }
      }
      if (anualidades.length != n){
        for (let i = activo.vidaUtil; i < n; i++){
          anualidades.push(0);
        }
      }
      totalesSalvamento[+activo.vidaUtil-1].valor = valorRescate + totalesSalvamento[+activo.vidaUtil-1].valor

      activos.push({
        name: activo.name,
        porcentajeDepreciacion: activo.porcentajeDepreciacion,
        anualidades: anualidades,
        valorRescate: valorRescate,
        vidaUtil:activo.vidaUtil
      })
    })
    totalesSalvamento = totalesSalvamento.filter((tot) => tot.valor != 0);
    return {
      activos: activos,
      totales: totales,
      totalesSalvamento: totalesSalvamento
    };
  }
  calcIngresos(ingresos:Ingreso[], n:number):any{
    let ingresosTotales:any = {
      ingresosOptimistas:{
        ingresos:[],
        totales:[],
      },
      ingresosPromedios:{
        ingresos:[],
        totales:[],
      },
      ingresosPesimistas:{
        ingresos:[],
        totales:[],
      }
    }
    ingresos.forEach((ingreso) => {
      let anualidadesOpt = [];
      let anualidadesProm = [];
      let anualidadesPesi = [];
      let anualidadOpt = ingreso.valorOptimista;
      let anualidadProm = (ingreso.valorOptimista + ingreso.valorPesimista) / 2;
      let anualidadPesi = ingreso.valorPesimista;
      for (let i = 0; i < n; i++){
        anualidadesOpt.push(anualidadOpt);
        anualidadesProm.push(anualidadProm);
        anualidadesPesi.push(anualidadPesi);

        if (ingresosTotales.ingresosOptimistas.totales[i] == undefined ){
          ingresosTotales.ingresosOptimistas.totales[i] = anualidadOpt
        }else{
          ingresosTotales.ingresosOptimistas.totales[i] = ingresosTotales.ingresosOptimistas.totales[i] + anualidadOpt;
        }

        if (ingresosTotales.ingresosPromedios.totales[i] == undefined ){
          ingresosTotales.ingresosPromedios.totales[i] = anualidadProm
        }else{
          ingresosTotales.ingresosPromedios.totales[i] = ingresosTotales.ingresosPromedios.totales[i] + anualidadProm;
        }

        if (ingresosTotales.ingresosPesimistas.totales[i] == undefined ){
          ingresosTotales.ingresosPesimistas.totales[i] = anualidadPesi
        }else{
          ingresosTotales.ingresosPesimistas.totales[i] = ingresosTotales.ingresosPesimistas.totales[i] + anualidadPesi;
        }

        anualidadOpt = anualidadOpt * (1 + (ingreso.incrementoAnual / 100))
        anualidadProm = anualidadProm * (1 + (ingreso.incrementoAnual / 100))
        anualidadPesi = anualidadPesi * (1 + (ingreso.incrementoAnual / 100))
      }

      ingresosTotales.ingresosOptimistas.ingresos.push({
        name: ingreso.name,
        incremento: ingreso.incrementoAnual,
        anualidades: anualidadesOpt
      })

      ingresosTotales.ingresosPromedios.ingresos.push({
        name: ingreso.name,
        incremento: ingreso.incrementoAnual,
        anualidades: anualidadesProm
      })

      ingresosTotales.ingresosPesimistas.ingresos.push({
        name: ingreso.name,
        incremento: ingreso.incrementoAnual,
        anualidades: anualidadesPesi
      })
    })
    return ingresosTotales;
  }

  makeFlujoFondos(
    ingresos:number[],
    costosProduccion:number[],
    costosAdministracion:number[],
    interes:number[],
    amortizaciones:number[],
    depreciacion:number[],
    valoresRescate:any[],
    tasaImpuestos:number,
    n:number
  ){
    let utilidadesOperacion:number[] = [];
    let utilidadesAntesImpuesto:number[] = [];
    let utilidadesDespImpuesto:number[] = [];
    let impuestos:number[] = [];
    let flujoNetoTotal:number[] = [];

    for (let i = 0; i < n; i++){
      let utilidadOperacion:number = ingresos[i] - costosProduccion[i];
      let utilidadAntesImpuesto:number = utilidadOperacion - costosAdministracion[i] - interes[i] - depreciacion[i];
      let impuesto:number = utilidadAntesImpuesto * (tasaImpuestos / 100);
      let utilidadDespImpuesto:number = utilidadAntesImpuesto - impuesto;
      let flujoNetoAnual:number = utilidadDespImpuesto + depreciacion[i] + 
      (valoresRescate.filter((r) => r.n == i).length == 0 ? 0 : valoresRescate.filter((r) => r.n == i)[0].valor) - amortizaciones[i];

      utilidadesOperacion.push(utilidadOperacion);
      utilidadesAntesImpuesto.push(utilidadAntesImpuesto);
      utilidadesDespImpuesto.push(utilidadDespImpuesto);
      impuestos.push(impuesto);
      flujoNetoTotal.push(flujoNetoAnual);
    }
    return {
      utilidadesOperacion:utilidadesOperacion,
      utilidadesAntesImpuesto:utilidadesAntesImpuesto,
      utilidadesDespImpuesto:utilidadesDespImpuesto,
      impuestos:impuestos,
      flujoNetoTotal:flujoNetoTotal,
    }
  }

  makeDesicion(
    flujoNetoTotal:number[],
    capital:number,
    tasaInteres:number,
    n:number,
    tmar:number
  ){
    let npv = 0;
    let vpn = 0;
    let beneficioCosto:number = 0;
    let caue = 0;
    let itr = 0;

    npv = this.npvCalculation(tasaInteres, flujoNetoTotal);

    vpn = - capital + npv;
    beneficioCosto = npv / - capital ;
    itr = this.irr(flujoNetoTotal)
    
    caue = this.pmt(tasaInteres, n, vpn, 0, 0);

    return {
      vpn:vpn,
      beneficioCosto:beneficioCosto,
      caue:caue,
      itr:itr
    }
  }

  npvCalculation(rate, flujoNeto){
    let result = 0;
    for (let i = 0; i < flujoNeto.length; i++) {
      result += flujoNeto[i] / Math.pow((1 + rate), i);
    }
    return result;
  }
  irr(cashFlows) {
    const epsilon = 0.0001;
    let guess = 0.1;
    let npv = 0;
    let irr = 0;
    let maxIterations = 1000; // Set a maximum number of iterations to prevent infinite loop
    
    const npvCalculation = (rate, cashFlows) => {
      let result = 0;
      for (let i = 0; i < cashFlows.length; i++) {
        result += cashFlows[i] / Math.pow((1 + rate), i);
      }
      return result;
    }
    
    // Calculate NPV at the guess rate
    npv = npvCalculation(guess, cashFlows);
    
    // Iterate until NPV is close enough to zero or maximum number of iterations is reached
    let i = 0;
    while (Math.abs(npv) > epsilon && i < maxIterations) {
      // Try a new rate based on the current NPV
      guess += (npv > 0 ? -epsilon : epsilon);
      npv = npvCalculation(guess, cashFlows);
      i++;
    }
    
    if (i === maxIterations) {
      console.warn('IRR function did not converge within the maximum number of iterations.');
    }
    
    irr = guess * 100;
    return irr;
  }

  pmt(rate, nper, pv, fv, type) {
    type = typeof type !== 'undefined' ? type : 0;
    
    let pmt = (rate * (pv * Math.pow(1 + rate, nper) + fv)) / ((1 + rate * type) * (Math.pow(1 + rate, nper) - 1));
    
    pmt = Math.round(pmt * 100) / 100;
    
    return -pmt;
  }
}
