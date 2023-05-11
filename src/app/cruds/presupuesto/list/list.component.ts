import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PedidosService } from '../services/pedidos.service';
import { Pedido } from 'app/interfaces/pedido';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  pedidos: Pedido[] = [];

  constructor(
    private pedidosService: PedidosService,
    private router: Router,
    ){}

    ngOnInit(){
      this.pedidosService.obtenerPedidos().subscribe(
        res => {
          console.log(res);
          this.pedidos = res;

        }
      );
    }

    goTo(id:number){
      console.log(id);
      this.router.navigate(['/cruds/presupuestos/show', id])
    }

    presupuestos(id:number){
      console.log(id);
      this.router.navigate(['/cruds/presupuestos/invoice', id])
    }
    
}
