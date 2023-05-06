import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from "./list/list.component";
import { NewComponent } from "./new/new.component";
import { EvaluateComponent } from './evaluate/evaluate.component';


const routes: Routes = [
  { path: "", redirectTo: 'list', pathMatch: 'full', },
  { path: "list", component: ListComponent },
  { path: "new", component: NewComponent },
  { path: "edit/:id", component: NewComponent },
  { path: "evaluate/:id", component: EvaluateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
