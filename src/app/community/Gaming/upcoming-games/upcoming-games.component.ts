import { Component, OnInit ,Input} from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { UpGamesService } from './shared/upgames.service';
import {Game} from './shared/game.model';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-upgames',
  templateUrl: './upcoming-games.component.html',
  styleUrls: ['./upcoming-games.component.scss']
})

export class UpcomingGamesComponent implements OnInit {
  userDoc: AngularFirestoreDocument<any>;
  gameDoc: AngularFirestoreDocument<any>;
  userUid:any;
  userName:any;
  showSpinner:boolean = true;
  games: Observable<Game[]>;
  @Input() limit:number;
  constructor(private afs: AngularFirestore,private authService:AuthService,private upgameSvc:UpGamesService) {

    const addGame:Game = {
      name:'Anthem',
      image:'https://goo.gl/nsHLQq',
      tags:'Role-Playing, Action , Shooting , Adventure',
      desc:'In Anthem, a new game from EAs BioWare studio, explore a landscape of primeval beauty, confront the dangers you find, and grow in power with every step.'
    }



    this.authService.user.subscribe((data)=>{
      if(data){
        this.userUid = data.uid;
        this.userName = data.displayName;
      }
    });
   }

  ngOnInit() {
    if(this.limit == 0){
      this.games = this.upgameSvc.getupGamesList();
    }else{
      this.games = this.upgameSvc.getupGamesLimit(this.limit);
    }
    this.games.subscribe((x)=>{
      this.showSpinner= false;
    });
  }
}
