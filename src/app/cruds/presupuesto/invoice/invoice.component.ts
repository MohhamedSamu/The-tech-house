import { Component } from '@angular/core';
import { Pedido, Solicitudes, Productos } from 'app/interfaces/pedido';
import { PedidosService } from '../services/pedidos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent {

  constructor(
    private pedidosService: PedidosService,
    private router: Router,
  ) {
  }

  pedido: Pedido = null;
  solicitudes: Solicitudes[] = [];
  ready: boolean = false;

  ngOnInit() {
      let id =
        this.router.url.split("/")[this.router.url.split("/").length - 1];

      this.obtenerPedidoPorID(+id);
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
      this.ready = true;
    });
  }
  
}
