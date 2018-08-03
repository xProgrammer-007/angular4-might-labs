import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from '../../../shared/shared.module';

import { NatureService } from './nature.service';
import {Routes, RouterModule} from "@angular/router";

import { NaturePostsListComponent } from '../posts-list/posts-list.component';
import { NaturePostFormComponent } from '../post-form/post-form.component';
import { NaturePostDetailComponent } from '../post-detail/post-detail.component';
import { NatureComponent } from '../nature.component';
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
    NaturePostsListComponent,
    NaturePostFormComponent,
    NaturePostDetailComponent,
    NatureComponent,
    Safe,
  ],
  exports:[
    NaturePostsListComponent,
    NaturePostFormComponent,
    NaturePostDetailComponent,
    NatureComponent,
  ],
  providers: [
    NatureService,
    Safe,
  ],
})
export class NatureModule { }
