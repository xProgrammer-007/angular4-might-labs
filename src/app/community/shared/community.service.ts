import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Community } from './community';

import { Observable } from 'rxjs/Observable';

import { CookieService } from 'ngx-cookie';

@Injectable()
export class CommunityService {

  private basePath = '/communitys';

  communitysRef: AngularFirestoreCollection<Community>;
  communityRef:  AngularFirestoreDocument<Community>;

  constructor(private afs: AngularFirestore,private _cookieService:CookieService) {
    this.communitysRef = afs.collection('/communitys');
  }

  // Return an observable list of Communitys
  getCommunitysList(): Observable<Community[]> {
    return this.communitysRef.snapshotChanges().map((arr) => {
      return arr.map((snap) => {
        const data = snap.payload.doc.data() as Community;
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


  updateNote(id:string, data:Partial <Community>){
    this.getNote(id).update(data);
  }


  deleteNote(id: string) {
    return this.getNote(id).delete();
  }


  getNote(id: string) {
    return this.afs.doc<Community>(`communitys/${id}`);
  }


  // Return a single observable community
  getCommunity(key: string): Observable<Community | null> {
    const communityPath = `${this.basePath}/${key}`;
    const community = this.afs.doc<Community>(communityPath).valueChanges() as Observable<Community | null>;
    return community;
  }

  // Create a brand new community
  createCommunity(community: Community): void {
    const data = Object.assign({},community);
  //  console.log(data);
    this.communitysRef.add(data);
  }


 // Update an exisiting community
  updateCommunity(key: string, value: any): void {
  //  this.communitysRef.update(key, value);
  }

  // Deletes a single community
  deleteCommunity(key: string): void {
  //  this.communitysRef.remove(key);
  }

  // Deletes the entire list of communitys
  deleteAll(): void {
  //  this.communitysRef.remove();
  }

  // Default error handling for all actions
  private handleError(error: Error) {
    console.error(error);
  }
}
