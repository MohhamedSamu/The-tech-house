import { Component } from '@angular/core';
import { Pedido, Solicitudes, Productos } from 'app/interfaces/pedido';
import { PedidosService } from '../services/pedidos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent {
  colapseState: boolean = false;
  createdState: boolean = false;
  showTable: boolean = true;
  editSolicitud: boolean = false;
  pedido: Pedido = {
    cliente : "",
    fecha: new Date().toISOString().substring(0,10),
    subTotal : 0,
    servicios: 0,
    precioFinal : 0,
  };
  newSolicitud: Solicitudes = {
    idPedido : 0,
    idProducto: 0,
    subTotal : 0,
    cantidad : 1,
    fotos: []
  };

  productos: Productos[] = [];
  solicitudes: Solicitudes[] = [];

  constructor(
    private pedidosService: PedidosService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    if (this.router.url.includes("show")) {
      let id =
        this.router.url.split("/")[this.router.url.split("/").length - 1];

        this.createdState = true;
        this.obtenerPedidoPorID(+id);
    }

    this.obtenerProductos();
  }

  obtenerProductos(){
    this.pedidosService.obtenerProductos().subscribe(res => this.productos = res);
  }

  obtenerPedidoPorID(id: number){
    this.pedidosService.obtenerPedidoPorId(id).subscribe(
      res => {
        console.log(res);
        if (res.length > 0) {
          this.pedido = res[0];
          this.pedido.fecha = new Date(this.pedido.fecha).toISOString().substring(0,10);
          console.log('hola')
          this.obtenerSolicitudes();
        } else {
          this.router.navigate(['/cruds/presupuestos/add']);
        }

      }
    );
  }

  obtenerSolicitudes(){
    this.pedidosService.obtenerSolicitudesPorIdPedido(this.pedido.id).subscribe(res => {
      this.solicitudes = res;
      console.log(this.solicitudes);
    });
  }

  onCantidadChange(){
    let precio = this.productos.find(ite => ite.idProducto == this.newSolicitud.idProducto).precio;
    this.newSolicitud.subTotal = this.newSolicitud.cantidad * precio;
  }

  showFormSolicitud(){
    this.showTable = false;
    this.editSolicitud = false;
    this.newSolicitud = {
      idPedido : this.pedido.id,
      idProducto: 0,
      cantidad : 1,
      subTotal : 0,
      fotos: []
    };
  }

  onSubmit(){
    console.log(this.pedido);
    this.pedidosService.crearPedido(this.pedido).subscribe(
      res => {
        this.router.navigate(['/cruds/presupuestos/show', res.insertId])
      }
    );
  }

  onSubmitSolicitud(){
    this.newSolicitud.fotos = JSON.stringify(this.newSolicitud.fotos);
    console.log(this.newSolicitud);
    this.pedidosService.crearSolicitud(this.newSolicitud).subscribe(
      res => {
        console.log(res);
        this.showTable = true;
        this.obtenerSolicitudes();
        //actualizar presupuesto
        this.actualizarPresupuesto();

      }
    )
  }

  actualizarPresupuesto(){
    let newSubtotal = this.pedido.subTotal + this.newSolicitud.subTotal;
    let newServicios = newSubtotal * 0.30;
    let newFinal = newSubtotal + newServicios;
    const body = {
      subTotal: newSubtotal,
      servicios: newServicios,
      precioFinal: newFinal,
      id: this.pedido.id
    };
    this.pedidosService.editarPedido(body).subscribe(
      res => {
        console.log(res);
        this.obtenerPedidoPorID(this.pedido.id);
      }
    )
  }

  eliminarSolicitud(solicitud: Solicitudes){
    this.pedidosService.eliminarSolicitud(solicitud.idSolicitud).subscribe(
      res => {
        console.log(res);
        let newSubtotal = this.pedido.subTotal - solicitud.subTotal;
        let newServicios = newSubtotal * 0.30;
        let newFinal = newSubtotal + newServicios;
        const body = {
          subTotal: newSubtotal,
          servicios: newServicios,
          precioFinal: newFinal,
          id: this.pedido.id
        };
        this.pedidosService.editarPedido(body).subscribe(
          res => {
            console.log(res);
            this.obtenerPedidoPorID(this.pedido.id);
          }
        );
      }
    )
  }

  goToPresupuesto(){
    this.router.navigate(['/cruds/presupuestos/invoice', this.pedido.id]);
  }


}
