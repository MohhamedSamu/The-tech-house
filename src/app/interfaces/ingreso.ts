export interface Ingreso {
  id?: number,
  name: string,
  categoria:number, //1-optimista 2-pesimista
  valor: number,
  projectId: number,
  incrementoAnual: number
}
