import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Comment {
  userId: any;
  username: any;
  commentVal: any;
  timeStamp:number;
  userPhoto:any;
}

@Injectable()
export class CommentService {
  constructor(private afs: AngularFirestore) { }
  // Star reviews that belong to a user
//  getUserStars(userId) {
//    const starsRef = this.afs.collection('stars', ref => ref.where('userId', '==', userId) );
//    return starsRef.valueChanges();
//  }
  // Get all stars that belog to a Movie
  getComments(Community , docID) {
    const commentsRef = this.afs.collection(`${Community}/${docID}/comments`);
    return commentsRef.valueChanges();
  }

  setComment(userId:any,userPhoto:any,username:any,community,docID,commentVal:any){
    const timeStamp = new Date().getTime();
    const thisComment:Comment = {userId,username,commentVal,timeStamp,userPhoto};
    const CommentPath = this.afs.collection(`${community}/${docID}/comments`);
    console.log(thisComment);
    return CommentPath.add(thisComment);
  }
  // Create or update star
//  setStar(userId, gameId, value , user,name) {
    // Star document data
//    const star: Star = { userId, gameId, value ,user , name};
    // Custom doc ID for relationship
//    const starPath = `stars/${star.userId}_${star.gameId}`;
    // Set the data, return the promise
//    return this.afs.doc(starPath).set(star)
  //}
}
