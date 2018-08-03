import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from '../../../shared/shared.module';

import { MechanicalService } from './mechanical.service';
import {Routes, RouterModule} from "@angular/router";

import { MechanicalPostsListComponent } from '../posts-list/posts-list.component';
import { MechanicalPostFormComponent } from '../post-form/post-form.component';
import { MechanicalPostDetailComponent } from '../post-detail/post-detail.component';
import { MechanicalComponent } from '../mechanical.component';
import { Safe } from './safe.pipe';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  declarations: [
    MechanicalPostsListComponent,
    MechanicalPostFormComponent,
    MechanicalPostDetailComponent,
    MechanicalComponent,
    Safe,
  ],
  exports:[
    MechanicalPostsListComponent,
    MechanicalPostFormComponent,
    MechanicalPostDetailComponent,
    MechanicalComponent,
  ],
  providers: [
    MechanicalService,
    Safe,
  ],
})
export class MechanicalModule { }
