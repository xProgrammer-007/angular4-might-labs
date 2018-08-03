import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
export interface Star {
  userId: any;
  gameId: any;
  value: number;
  user:any;
  name:any;
}
@Injectable()
export class StarService {
  constructor(private afs: AngularFirestore) { }
  // Star reviews that belong to a user
  getUserStars(userId) {
    const starsRef = this.afs.collection('stars', ref => ref.where('userId', '==', userId) );
    return starsRef.valueChanges();
  }
  // Get all stars that belog to a Movie
  getMovieStars(gameId) {
    const starsRef = this.afs.collection('stars', ref => ref.where('gameId', '==', gameId) );
    return starsRef.valueChanges();
  }
  // Create or update star
  setStar(userId, gameId, value , user,name) {
    // Star document data
    const star: Star = { userId, gameId, value ,user , name};
    // Custom doc ID for relationship
    const starPath = `stars/${star.userId}_${star.gameId}`;
    // Set the data, return the promise
    return this.afs.doc(starPath).set(star)
  }
}
