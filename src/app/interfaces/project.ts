export interface Project {
  id?: number;
  name: string;
  canBeEvaluated: boolean;
  tmar?: number;
  totalActivosFijos?: number;
  porcentajeCapitalPropio?: number;
  totalCapitalPropio?:number;
  porcentajePrestamo?:number;
  totalPrestamo?:number;
  tasaInteresBanco?: number;
  tiempoPrestamo?: number;
  tasaImpuesto?: number;
}
