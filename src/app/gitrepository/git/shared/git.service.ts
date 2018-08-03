import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Git } from './git';

import { Observable } from 'rxjs/Observable';

import { CookieService } from 'ngx-cookie';

@Injectable()
export class GitService {

  private basePath = '/gits';

  gitsRef: AngularFirestoreCollection<Git>;
  gitRef:  AngularFirestoreDocument<Git>;

  constructor(private afs: AngularFirestore,private _cookieService:CookieService) {
    this.gitsRef = afs.collection('/gits');
  }

  // Return an observable list of Gits
  getGitsList(): Observable<Git[]> {
    return this.gitsRef.snapshotChanges().map((arr) => {
      return arr.map((snap) => {
        const data = snap.payload.doc.data() as Git;
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


  updateNote(id:string, data:Partial <Git>){
    this.getNote(id).update(data);
  }


  deleteNote(id: string) {
    return this.getNote(id).delete();
  }


  getNote(id: string) {
    return this.afs.doc<Git>(`gits/${id}`);
  }


  // Return a single observable git
  getGit(key: string): Observable<Git | null> {
    const gitPath = `${this.basePath}/${key}`;
    const git = this.afs.doc<Git>(gitPath).valueChanges() as Observable<Git | null>;
    return git;
  }

  // Create a brand new git
  createGit(git: Git): void {
    const data = Object.assign({},git);
  //  console.log(data);
    this.gitsRef.add(data);
  }


 // Update an exisiting git
  updateGit(key: string, value: any): void {
  //  this.gitsRef.update(key, value);
  }

  // Deletes a single git
  deleteGit(key: string): void {
  //  this.gitsRef.remove(key);
  }

  // Deletes the entire list of gits
  deleteAll(): void {
  //  this.gitsRef.remove();
  }

  // Default error handling for all actions
  private handleError(error: Error) {
    console.error(error);
  }
}
