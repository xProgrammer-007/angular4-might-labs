import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Mechanical } from './mechanical';

import { Observable } from 'rxjs/Observable';

import { CookieService } from 'ngx-cookie';

@Injectable()
export class MechanicalService {

  private basePath = '/mechanicals';

  mechanicalsRef: AngularFirestoreCollection<Mechanical>;
  mechanicalRef:  AngularFirestoreDocument<Mechanical>;

  constructor(private afs: AngularFirestore,private _cookieService:CookieService) {
    this.mechanicalsRef = afs.collection('/mechanicals');
  }

  // Return an observable list of Mechanicals
  getMechanicalsList(): Observable<Mechanical[]> {
    return this.mechanicalsRef.snapshotChanges().map((arr) => {
      return arr.map((snap) => {
        const data = snap.payload.doc.data() as Mechanical;
        data.$key = snap.payload.doc.id;
        //console.log(data);
        //console.log(Object.assign(snap.payload.doc.data(),{$key:snap.payload.doc.id}));
        return data;
      });
    });
  }

  getMechanicalsListLimit(num:number): Observable<Mechanical[]> {
    const mechaRef:AngularFirestoreCollection<Mechanical> = this.afs.collection('/mechanicals',ref=>(ref.limit(num)));
     return mechaRef.snapshotChanges().map((arr) => {
      return arr.map((snap) => {
        const data = snap.payload.doc.data() as Mechanical;
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


  updateNote(id:string, data:Partial <Mechanical>){
    this.getNote(id).update(data);
  }


  deleteNote(id: string) {
    return this.getNote(id).delete();
  }


  getNote(id: string) {
    return this.afs.doc<Mechanical>(`mechanicals/${id}`);
  }


  // Return a single observable mechanical
  getMechanical(key: string): Observable<Mechanical | null> {
    const mechanicalPath = `${this.basePath}/${key}`;
    const mechanical = this.afs.doc<Mechanical>(mechanicalPath).valueChanges() as Observable<Mechanical | null>;
    return mechanical;
  }

  // Create a brand new mechanical
  createMechanical(mechanical: Mechanical): void {
    const data = Object.assign({},mechanical);
  //  console.log(data);
    this.mechanicalsRef.add(data);
  }


 // Update an exisiting mechanical
  updateMechanical(key: string, value: any): void {
  //  this.mechanicalsRef.update(key, value);
  }

  // Deletes a single mechanical
  deleteMechanical(key: string): void {
  //  this.mechanicalsRef.remove(key);
  }

  // Deletes the entire list of mechanicals
  deleteAll(): void {
  //  this.mechanicalsRef.remove();
  }

  // Default error handling for all actions
  private handleError(error: Error) {
    console.error(error);
  }
}
