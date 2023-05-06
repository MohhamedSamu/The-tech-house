import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.routing';
import { NewComponent } from './new/new.component';
import { ListComponent } from './list/list.component';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';


import { FormsModule } from '@angular/forms';
import { EvaluateComponent } from './evaluate/evaluate.component';

@NgModule({
  declarations: [
    NewComponent,
    ListComponent,
    EvaluateComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,

    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTabsModule,
    FormsModule
  ]
})
export class ProjectsModule { }
