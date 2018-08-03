import { Component, OnInit ,Input} from '@angular/core';

import { GameService } from '../shared/game.service';

import { Game } from '../shared/game';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'game-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class GamePostsListComponent implements OnInit {

  games: Observable<Game[]>;
  showSpinner = true;
  @Input() limit:number;
  @Input() routeLink;
  constructor(private gameService: GameService) {

  }


instrImg(data:any):string{
  var img =  new RegExp(/\[image]([^]*?)\[\/image\]/);
  if(img.test(data)){
    return data.match(img)[1];
  }else{
    return '../../../assets/img/dash.jpg';
  }

}

  hearts(id:string,uid:string,val:number){
    //console.log(id,uid);
  this.gameService.hearts(id,uid,val);
  }

  ngOnInit() {
    if(this.limit == 0 ){
      this.games = this.gameService.getGamesList();
    }else{
        this.games = this.gameService.getGamesListLimit(this.limit);
    }
    this.games.subscribe((x) => {
      this.showSpinner = false;
    });
  }

  deleteGames() {
    this.gameService.deleteAll();
  }
}
