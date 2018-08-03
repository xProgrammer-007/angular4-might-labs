import {Injectable , OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';

interface student{
name:string;
uid:string;
photo:string;
}


@Injectable()
export class StudentService {
  studentCollection:AngularFirestoreCollection<student>;
constructor(private afs:AngularFirestore){
this.studentCollection = this.afs.collection('students');

}




getData():Observable<student[]>{
  return this.studentCollection.valueChanges();
}

registerStudent(uid:string,name:string,photo:string){
  const data ={
    uid,
    name,
    photo
  }
return this.afs.doc<student>(`students/${uid}`).set(data);
}



checkStudent(uid:string):any{
return this.afs.collection('students').doc(uid).ref.get().then((docSnapshot)=>{
    if(docSnapshot.exists){
        console.log('True');
        return true;
    }else{
      console.log('false');
      return false;
    }
  }).catch((err)=>{
    console.log('Error retrieving ...');
  })
}



}
