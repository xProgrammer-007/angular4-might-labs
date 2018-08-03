import { Component, OnInit, Input } from '@angular/core';
import { StarService } from '../shared/star.service';
import { Observable } from 'rxjs/Observable';
import {AuthService} from '../../../../services/auth.service';
import {NotifyService} from '../../../../services/notify.service';
declare var $:any;

@Component({
  selector: 'star-review',
  templateUrl: './star-review.component.html',
  styleUrls: ['./star-review.component.scss']
})
export class StarReviewComponent implements OnInit {
  @Input() userId;
  @Input() gameId;
  @Input() user;
  @Input() name;
  uid:any|null;
  stars: Observable<any>;
  avgRating: Observable<any>;
  constructor(private starService: StarService,private authService:AuthService,private _notify:NotifyService) {
    this.authService.user.subscribe((user)=>{
      if(user){
        this.uid = user.uid;
      }
  });
   }
  ngOnInit() {



    this.stars = this.starService.getMovieStars(this.gameId)
    this.avgRating = this.stars.map(arr => {
      const ratings = arr.map(v => v.value)
      return ratings.length ? ratings.reduce((total, val) => total + val) / arr.length : 'Not reviewed'
    });

    this.stars.subscribe((data)=>{
      data.map((x)=>{
        if(!this.uid)  return;

        if(x.userId == this.uid){
          this.rateItem(x.value,this.gameId)
        }
      })
    })

  }
  starHandler(value:string,gameIds:string) {
    if(!this.uid){
      this._notify.notify('top','left','Howdy Guest , Please go to Members Section and Sign in to make your opinion count .','warning');
      return;
    }
    this.starService.setStar(this.userId, gameIds, value , this.user , this.name)
  }

  rateItem(value:string,gameid:string){
    var temp;
    if(value.toString().indexOf('.') == -1){
      temp = gameid + "-star"+ value.toString().charAt(0);
    }else{
      temp = gameid + "-halfstar"+ value.toString().charAt(0);
    }
    document.getElementsByClassName(temp)[0].setAttribute('checked','checked');
  }

}
