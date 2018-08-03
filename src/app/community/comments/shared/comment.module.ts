import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CommentsComponent} from '../comment.component';
import {CommentService} from '../comment.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  declarations: [
    CommentsComponent
  ],
  exports:[
    CommentsComponent
  ],
  providers: [
    CommentService
  ],
})

export class CommentsModule {}
