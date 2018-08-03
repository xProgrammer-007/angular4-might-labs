import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from '../../shared/shared.module';

import { CommunityService } from './community.service';
import {Routes, RouterModule} from "@angular/router";

import { CommunityListComponent } from '../community-list/community-list.component';
import {DevModule} from '../Devs/shared/dev.module';

import {ExploitModule} from '../Exploits/shared/exploit.module';
import {GameModule} from '../Gaming/shared/game.module';
import {MechanicalModule} from '../Mechanical/shared/mechanical.module';
import {NatureModule} from '../Nature/shared/nature.module';
import {TechnologyModule} from '../Tech/shared/technology.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    DevModule,
    ExploitModule,
    GameModule,
    MechanicalModule,
    NatureModule,
    TechnologyModule,
  ],
  declarations: [
    CommunityListComponent
  ],
  providers: [
    CommunityService
  ],
  exports:[
    DevModule,
    ExploitModule,
    GameModule,
    MechanicalModule,
    NatureModule,
    TechnologyModule,
  ]
})
export class CommunityModule { }
