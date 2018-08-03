import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireDatabaseModule } from 'angularfire2/database';

import { SharedModule } from '../../../shared/shared.module';

import { GitService } from './git.service';
import {Routes, RouterModule} from "@angular/router";

import { GitsListComponent } from '../gits-list/gits-list.component';
import { GitFormComponent } from '../git-form/git-form.component';
import { GitDetailComponent } from '../git-detail/git-detail.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AngularFireDatabaseModule,
  ],
  declarations: [
    GitsListComponent,
    GitFormComponent,
    GitDetailComponent,
  ],
  providers: [
    GitService,
  ],
})
export class GitModule { }
