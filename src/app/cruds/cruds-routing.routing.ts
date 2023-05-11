import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: 'projects',
    children: [{
      path: '',
      loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule)
    }]
  },
  {
    path: 'presupuestos',
    children: [{
      path: '',
      loadChildren: () => import('./presupuesto/presupuesto.module').then(m => m.PresupuestoModule)
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudsRoutingModule { }
