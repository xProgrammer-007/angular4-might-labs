import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {NotifyService} from './notify.service';

interface User {
  uid: string;
  email?: string | null;
  photoURL?: string;
  displayName?: string;
  adminRole?:boolean;
  readerRole?:boolean;
}

@Injectable()
export class AuthService {

  user:Observable<User|null>; //BehaviorSubject<User> = new BehaviorSubject(null) ;
  authState:Observable<User|null>;
  userInfo:AngularFirestoreDocument<User>;
  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private _notify:NotifyService
              ) {

              this.user = this.afAuth.authState
              .switchMap((auth) => {
                if(auth){
                  return this.afs.doc<User>(`users/${auth.uid}`).valueChanges();
                }else{
                  return Observable.of(null);
                }
              });

/*               this.afAuth.authState
                  .switchMap((auth) => {
                    if (auth) {
                        return this.afs.doc<User>(`users/${auth.uid}`).valueChanges();
                    } else {
                        return Observable.of(null);
                    }
                  })
                  .subscribe(user => {
                    this.user.next(user);
                  })
*/
  }


  get authenticated():boolean{
      return this.authState !== null;
    }

  ////// OAuth Methods /////

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: firebase.auth.AuthProvider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        return this.updateUserData(credential.user);
      })
      .catch((error) => this.handleError(error) );
  }

  //// Anonymous Auth ////

  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
      .then((user) => {
        return this.updateUserData(user); // if using firestore
      })
      .catch((error) => {
        console.error(error.code);
        console.error(error.message);
        this.handleError(error);
      });
  }

  //// Email/Password Auth ////

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        return this.updateUserData(user); // if using firestore
      })
      .catch((error) => this.handleError(error) );
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        return this.updateUserData(user); // if using firestore
      })
      .catch((error) => this.handleError(error) );
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => console.log('Password update email sent', 'info'))
      .catch((error) => this.handleError(error));
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/signin']);
    });

  }



  // If error, console log and notify user
  private handleError(error: Error) {
    //console.error(error);
    if(error){

    this._notify.notify('top','left',error.message,'danger');
  }
  }

  // Sets user data to firestore after succesful login
  private updateUserData(user: User) {

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || 'Anonymous',
      photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ',
      adminRole:false,
      readerRole:true,
    };
    return userRef.set(data);
  }
}
