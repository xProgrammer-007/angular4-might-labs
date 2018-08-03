import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from './comment.service';
import { Observable } from 'rxjs/Observable';
import {AuthService} from '../../services/auth.service';
import {NotifyService} from '../../services/notify.service';
declare var $:any;

@Component({
  selector: 'comment-section',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() community:string;
  @Input() docID:string;

  CommentValue:string;
  uid:any|null;
  userName:any|null;
  userPhoto:any|null;

  comments: Observable<any>;

  avgRating: Observable<any>;
  constructor(private commentService: CommentService,private authService:AuthService,private _notify:NotifyService) {
    this.authService.user.subscribe((user)=>{
      if(user){
        this.uid = user.uid;
        this.userName = user.displayName;
        this.userPhoto = user.photoURL;
      }
  });
   }
  ngOnInit() {



    this.comments = this.commentService.getComments(this.community, this.docID);

  }
  addComment() {
    if(!this.uid){
      this._notify.notify('top','left','Howdy Guest , Please go to Members Section and Sign in to make your opinion count .','warning');
      return;
    }
    this.commentService.setComment(this.uid,this.userPhoto,this.userName,this.community,this.docID,this.CommentValue);
  }


}
