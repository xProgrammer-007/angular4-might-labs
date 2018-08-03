import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from '../../../shared/shared.module';

import { TechnologyService } from './technology.service';
import {Routes, RouterModule} from "@angular/router";

import { TechnologyPostsListComponent } from '../posts-list/posts-list.component';
import { TechnologyPostFormComponent } from '../post-form/post-form.component';
import { TechnologyPostDetailComponent } from '../post-detail/post-detail.component';
import { TechnologyComponent } from '../technology.component';
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
    TechnologyPostsListComponent,
    TechnologyPostFormComponent,
    TechnologyPostDetailComponent,
    TechnologyComponent,
    Safe,
  ],
  exports:[
    TechnologyPostsListComponent,
    TechnologyPostFormComponent,
    TechnologyPostDetailComponent,
    TechnologyComponent,
  ],
  providers: [
    TechnologyService,
    Safe,
  ],
})
export class TechnologyModule { }
