import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { InvoiceComponent } from './invoice/invoice.component';

const routes: Routes = [
  { path: "", redirectTo: 'list', pathMatch: 'full', },
  { path: "list", component: ListComponent },
  { path: "add", component: NewComponent },
  { path: "show/:id", component: NewComponent },
  { path: "invoice/:id", component: InvoiceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresupuestoRoutingModule { }
