import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Pedido, Solicitudes } from 'app/interfaces/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidosService
{

  constructor(
    private http: HttpClient,
    ) { }

    getUrl(): string {
      return `${environment.apiUrl}/pedidos/`;
    }

    obtenerPedidos(): Observable<any>{
      const url = this.getUrl() + 'obtenerPedidos';
      return this.http.get(url);
    }

    obtenerProductos(): Observable<any>{
      const url = this.getUrl() + 'obtenerProductos';
      return this.http.get(url);
    }

    obtenerPedidoPorId(id: number): Observable<any>{
      const url = this.getUrl() + 'obtenerPedidoPorId/' + id;
      return this.http.get(url);
    }

    obtenerSolicitudesPorIdPedido(idPedido: number): Observable<any>{
      const url = this.getUrl() + 'obtenerSolicitudesPorIdPedido/' + idPedido;
      return this.http.get(url);
    }

    crearPedido(newProject: Pedido) : Observable<any>{
      console.log(newProject);
      const url = this.getUrl() + 'crearPedido';
      return this.http.post(url, newProject);
    }

    crearSolicitud(newSolicitud: Solicitudes) : Observable<any>{
      console.log(newSolicitud);
      const url = this.getUrl() + 'crearSolicitud';
      return this.http.post(url, newSolicitud);
    }

    editarPedido(pedido: Pedido) : Observable<any>{
      console.log(pedido);
      const url = this.getUrl() + 'editarPedido';
      return this.http.put(url, pedido);
    }

    eliminarSolicitud(idSolicitud: number): Observable<any>{
      const url = this.getUrl() + 'eliminarSolicitud/' + idSolicitud;
      return this.http.delete(url);
    }
}