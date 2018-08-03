import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingSpinnerComponent } from '../animated/loading-spinner/loading-spinner.component';
import { AnimatedPostComponent } from '../animated/animated-posts/animated-post.component';
import { AnimatedComponent} from '../animated/animated.component';
import {CommentsModule} from '../community/comments/shared/comment.module';

@NgModule({
  imports: [
    CommonModule,
    CommentsModule
  ],
  declarations: [
    LoadingSpinnerComponent,
    AnimatedPostComponent,
    AnimatedComponent,
  ],
  exports: [
    LoadingSpinnerComponent,
    AnimatedPostComponent,
    AnimatedComponent,
    CommentsModule
  ],
})
export class SharedModule { }
