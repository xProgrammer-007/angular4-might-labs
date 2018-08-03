import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Game } from './game';

import { Observable } from 'rxjs/Observable';

import { CookieService } from 'ngx-cookie';

@Injectable()
export class GameService {

  private basePath = '/games';

  gamesRef: AngularFirestoreCollection<Game>;
  gameRef:  AngularFirestoreDocument<Game>;

  constructor(private afs: AngularFirestore,private _cookieService:CookieService) {
    this.gamesRef = afs.collection('/games');
  }

  // Return an observable list of Games
  getGamesList(): Observable<Game[]> {
    return this.gamesRef.snapshotChanges().map((arr) => {
      return arr.map((snap) => {
        const data = snap.payload.doc.data() as Game;
        data.$key = snap.payload.doc.id;
        //console.log(data);
        //console.log(Object.assign(snap.payload.doc.data(),{$key:snap.payload.doc.id}));
        return data;
      });
    });
  }

  getGamesListLimit(num:number): Observable<Game[]> {
    const refs:AngularFirestoreCollection<Game> = this.afs.collection('/games',ref => (ref.limit(num)));
    return refs.snapshotChanges().map((arr) => {
      return arr.map((snap) => {
        const data = snap.payload.doc.data() as Game;
        data.$key = snap.payload.doc.id;
        //console.log(data);
        //console.log(Object.assign(snap.payload.doc.data(),{$key:snap.payload.doc.id}));
        return data;
      });
    });
  }

  hearts(id:string,uid:string,val:number){
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 500);

    const config = {
      expires:expireDate
    };

    var cData = this._cookieService.get(id);
  //  console.log(cData , expireDate ,id , uid);
    if(cData === undefined || cData == ''){
    //  console.log(cData , 'no cookie ');
      this._cookieService.put(id,uid,config);
      this.updateNote(id, { hearts: val + 1 });
    }
  }


  updateNote(id:string, data:Partial <Game>){
    this.getNote(id).update(data);
  }


  deleteNote(id: string) {
    return this.getNote(id).delete();
  }


  getNote(id: string) {
    return this.afs.doc<Game>(`games/${id}`);
  }


  // Return a single observable game
  getGame(key: string): Observable<Game | null> {
    const gamePath = `${this.basePath}/${key}`;
    const game = this.afs.doc<Game>(gamePath).valueChanges() as Observable<Game | null>;
    return game;
  }

  // Create a brand new game
  createGame(game: Game): void {
    const data = Object.assign({},game);
  //  console.log(data);
    this.gamesRef.add(data);
  }


 // Update an exisiting game
  updateGame(key: string, value: any): void {
  //  this.gamesRef.update(key, value);
  }

  // Deletes a single game
  deleteGame(key: string): void {
  //  this.gamesRef.remove(key);
  }

  // Deletes the entire list of games
  deleteAll(): void {
  //  this.gamesRef.remove();
  }

  // Default error handling for all actions
  private handleError(error: Error) {
    console.error(error);
  }
}
