import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Dev } from './dev';

import { Observable } from 'rxjs/Observable';

import { CookieService } from 'ngx-cookie';

@Injectable()
export class DevService {

  private basePath = '/devs';

  devsRef: AngularFirestoreCollection<Dev>;
  devRef:  AngularFirestoreDocument<Dev>;

  constructor(private afs: AngularFirestore,private _cookieService:CookieService) {
    this.devsRef = afs.collection('/devs');
  }

  // Return an observable list of Devs
  getDevsList(): Observable<Dev[]> {
    return this.devsRef.snapshotChanges().map((arr) => {
      return arr.map((snap) => {
        const data = snap.payload.doc.data() as Dev;
        data.$key = snap.payload.doc.id;
        //console.log(data);
        //console.log(Object.assign(snap.payload.doc.data(),{$key:snap.payload.doc.id}));
        return data;
      });
    });
  }

  getDevsListLimit(num:number): Observable<Dev[]> {
    const limitedRef:AngularFirestoreCollection<Dev> = this.afs.collection('/devs',ref => ref.limit(num));
    return limitedRef.snapshotChanges().map((arr) => {
      return arr.map((snap) => {
        const data = snap.payload.doc.data() as Dev;
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


  updateNote(id:string, data:Partial <Dev>){
    this.getNote(id).update(data);
  }


  deleteNote(id: string) {
    return this.getNote(id).delete();
  }


  getNote(id: string) {
    return this.afs.doc<Dev>(`devs/${id}`);
  }


  // Return a single observable dev
  getDev(key: string): Observable<Dev | null> {
    const devPath = `${this.basePath}/${key}`;
    const dev = this.afs.doc<Dev>(devPath).valueChanges() as Observable<Dev | null>;
    const devKey = this.getDevsList() as Observable<Dev[] | null>;
    //dev.$key = devKey.map(())
    return dev;
  }

  // Create a brand new dev
  createDev(dev: Dev): void {
    const data = Object.assign({},dev);
  //  console.log(data);
    this.devsRef.add(data);
  }


 // Update an exisiting dev
  updateDev(key: string, value: any): void {
  //  this.devsRef.update(key, value);
  }

  // Deletes a single dev
  deleteDev(key: string): void {
  //  this.devsRef.remove(key);
  }

  // Deletes the entire list of devs
  deleteAll(): void {
  //  this.devsRef.remove();
  }

  // Default error handling for all actions
  private handleError(error: Error) {
    console.error(error);
  }
}
