import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Technology } from './technology';

import { Observable } from 'rxjs/Observable';

import { CookieService } from 'ngx-cookie';

@Injectable()
export class TechnologyService {

  private basePath = '/technologys';

  technologysRef: AngularFirestoreCollection<Technology>;
  technologyRef:  AngularFirestoreDocument<Technology>;

  constructor(private afs: AngularFirestore,private _cookieService:CookieService) {
    this.technologysRef = afs.collection('/technologys');
  }

  // Return an observable list of Technologys
  getTechnologysList(): Observable<Technology[]> {
    return this.technologysRef.snapshotChanges().map((arr) => {
      return arr.map((snap) => {
        const data = snap.payload.doc.data() as Technology;
        data.$key = snap.payload.doc.id;
        //console.log(data);
        //console.log(Object.assign(snap.payload.doc.data(),{$key:snap.payload.doc.id}));
        return data;
      });
    });
  }

  getTechnologysListLimit(num:number): Observable<Technology[]> {
    const TechRef:AngularFirestoreCollection<Technology> = this.afs.collection('/technologys',ref=>(ref.limit(num)));
    return TechRef.snapshotChanges().map((arr) => {
      return arr.map((snap) => {
        const data = snap.payload.doc.data() as Technology;
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


  updateNote(id:string, data:Partial <Technology>){
    this.getNote(id).update(data);
  }


  deleteNote(id: string) {
    return this.getNote(id).delete();
  }


  getNote(id: string) {
    return this.afs.doc<Technology>(`technologys/${id}`);
  }


  // Return a single observable technology
  getTechnology(key: string): Observable<Technology | null> {
    const technologyPath = `${this.basePath}/${key}`;
    const technology = this.afs.doc<Technology>(technologyPath).valueChanges() as Observable<Technology | null>;
    return technology;
  }

  // Create a brand new technology
  createTechnology(technology: Technology): void {
    const data = Object.assign({},technology);
  //  console.log(data);
    this.technologysRef.add(data);
  }


 // Update an exisiting technology
  updateTechnology(key: string, value: any): void {
  //  this.technologysRef.update(key, value);
  }

  // Deletes a single technology
  deleteTechnology(key: string): void {
  //  this.technologysRef.remove(key);
  }

  // Deletes the entire list of technologys
  deleteAll(): void {
  //  this.technologysRef.remove();
  }

  // Default error handling for all actions
  private handleError(error: Error) {
    console.error(error);
  }
}
