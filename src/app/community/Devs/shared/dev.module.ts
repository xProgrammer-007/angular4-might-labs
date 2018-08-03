import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from '../../../shared/shared.module';

import { DevService } from './dev.service';
import {Routes, RouterModule} from "@angular/router";

import { DevPostsListComponent } from '../posts-list/posts-list.component';
import { DevPostFormComponent } from '../post-form/post-form.component';
import { DevPostDetailComponent } from '../post-detail/post-detail.component';
import { DevsComponent } from '../devs.component';
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
    DevPostsListComponent,
    DevPostFormComponent,
    DevPostDetailComponent,
    DevsComponent,
    Safe,
  ],
  exports:[
    DevPostsListComponent,
    DevPostFormComponent,
    DevPostDetailComponent,
  ],
  providers: [
    DevService,
    Safe,
  ],
})
export class DevModule { }
