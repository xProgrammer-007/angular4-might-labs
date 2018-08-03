import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from '../../../shared/shared.module';

import { GameService } from './game.service';
import {Routes, RouterModule} from "@angular/router";

import { GamePostsListComponent } from '../posts-list/posts-list.component';
import { GamePostFormComponent } from '../post-form/post-form.component';
import { GamePostDetailComponent } from '../post-detail/post-detail.component';
import { GamesComponent } from '../gaming.component';
import { Safe } from './safe.pipe';

import {StarService} from '../upcoming-games/shared/star.service';
import {UpGamesService} from '../upcoming-games/shared/upgames.service';
import {UpcomingGamesComponent} from '../upcoming-games/upcoming-games.component';
import {StarReviewComponent} from '../upcoming-games/star-review/star-review.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  declarations: [
    GamePostsListComponent,
    GamePostFormComponent,
    GamePostDetailComponent,
    GamesComponent,
    Safe,
    UpcomingGamesComponent,
    StarReviewComponent
  ],
  exports:[
    GamePostsListComponent,
    GamePostFormComponent,
    GamePostDetailComponent,
    GamesComponent,
    UpcomingGamesComponent,
  ],
  providers: [
    GameService,
    Safe,
    StarService,
    UpGamesService
  ],
})
export class GameModule { }
