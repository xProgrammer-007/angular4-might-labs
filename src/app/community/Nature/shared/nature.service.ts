import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Nature } from './nature';

import { Observable } from 'rxjs/Observable';

import { CookieService } from 'ngx-cookie';

@Injectable()
export class NatureService {

  private basePath = '/natures';

  naturesRef: AngularFirestoreCollection<Nature>;
  natureRef:  AngularFirestoreDocument<Nature>;

  constructor(private afs: AngularFirestore,private _cookieService:CookieService) {
    this.naturesRef = afs.collection('natures');
  }

  // Return an observable list of Natures
  getNaturesList(): Observable<Nature[]> {
    return this.naturesRef.snapshotChanges().map((arr) => {
      return arr.map((snap) => {
        const data = snap.payload.doc.data() as Nature;
        data.$key = snap.payload.doc.id;
        //console.log(data);
        //console.log(Object.assign(snap.payload.doc.data(),{$key:snap.payload.doc.id}));
        return data;
      });
    });
  }

  getNaturesListLimit(num:number): Observable<Nature[]> {
    const NaRef:AngularFirestoreCollection<Nature> = this.afs.collection('/natures',ref=>(ref.limit(num)));
    return NaRef.snapshotChanges().map((arr) => {
      return arr.map((snap) => {
        const data = snap.payload.doc.data() as Nature;
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


  updateNote(id:string, data:Partial <Nature>){
    this.getNote(id).update(data);
  }


  deleteNote(id: string) {
    return this.getNote(id).delete();
  }


  getNote(id: string) {
    return this.afs.doc<Nature>(`natures/${id}`);
  }


  // Return a single observable nature
  getNature(key: string): Observable<Nature | null> {
    const naturePath = `${this.basePath}/${key}`;
    const nature = this.afs.doc<Nature>(naturePath).valueChanges() as Observable<Nature | null>;
    return nature;
  }

  // Create a brand new nature
  createNature(nature: Nature): void {
    const data = Object.assign({},nature);
  //  console.log(data);
    this.naturesRef.add(data);
  }


 // Update an exisiting nature
  updateNature(key: string, value: any): void {
  //  this.naturesRef.update(key, value);
  }

  // Deletes a single nature
  deleteNature(key: string): void {
  //  this.naturesRef.remove(key);
  }

  // Deletes the entire list of natures
  deleteAll(): void {
  //  this.naturesRef.remove();
  }

  // Default error handling for all actions
  private handleError(error: Error) {
    console.error(error);
  }
}
