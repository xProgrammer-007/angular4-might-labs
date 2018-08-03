import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument , AngularFirestoreCollection} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Game } from './game.model';

@Injectable()
export class UpGamesService {

  upGamesRef:AngularFirestoreCollection<Game>;

  constructor(private afs: AngularFirestore) {
    this.upGamesRef = this.afs.collection('UpGames');
  }

  getupGamesList():Observable<Game[]>{
    return this.upGamesRef.snapshotChanges().map((obj) =>{
      return obj.map((val)=>{
        const ret = val.payload.doc.data() as Game;
        ret.$key = val.payload.doc.id;
        return ret;
      })
    });
  }
  getupGamesLimit(num:number):Observable<Game[]>{
    const upREf:AngularFirestoreCollection<Game> = this.afs.collection('UpGames',ref =>(ref.limit(num)));
    return upREf.snapshotChanges().map((obj) =>{
      return obj.map((val)=>{
        const ret = val.payload.doc.data() as Game;
        ret.$key = val.payload.doc.id;
        return ret;
      })
    });
  }

  insertGame(game:Game){
    var gameId;
    const newGame = Object.assign({},game);
    var a = game.name;

    if(a.indexOf(' ')){
      gameId = a.split(' ')[0] + '-game-' + new Date().getTime().toString().slice(-4);
    }else{
      gameId = a + '-game-' + new Date().getTime().toString().slice(-4);
    }
    console.log(newGame);
    const gameDoc:AngularFirestoreDocument<Game> = this.afs.doc(`UpGames/${gameId}`);
    return gameDoc.set(newGame);
  }

  /*getUserStars(userId) {
    const starsRef = this.afs.collection('stars', ref => ref.where('userId', '==', userId) );
    return starsRef.valueChanges();
  }
  // Get all stars that belog to a Movie
  getMovieStars(gameId) {
    const starsRef = this.afs.collection('stars', ref => ref.where('gameId', '==', gameId) );
    return starsRef.valueChanges();
  }
  // Create or update star
  setStar(userId, gameId, value) {
    // Star document data
    const star: Star = { userId, gameId, value };
    // Custom doc ID for relationship
    const starPath = `stars/${star.userId}_${star.gameId}`;
    // Set the data, return the promise
    return this.afs.doc(starPath).set(star)
  }

  */
}
