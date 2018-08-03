import { Injectable , OnInit} from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import {AngularFireAuth} from 'angularfire2/auth';
import { Member } from './memberinfo';
import {AuthService} from '../../services/auth.service';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

interface NewMember {
  adminRole:boolean;
  membername: string;
  memberphoto: string;
  memberuid:string;
  membercity:string;
  memberorg:string;
  memberdesc:string;
  memberhobbies:string;
  memberskills:string;
  memberweb:string;
  time: number;
}

@Injectable()
export class MemberInfoService implements OnInit{

  membersCollection: AngularFirestoreCollection<Member>;
  memberState:AngularFirestoreDocument<Member>;
  particularMember:AngularFirestoreDocument<Member>;
  memberDocument:   AngularFirestoreDocument<Node>;
  uid:any;
  MemberReturnUid:any;
  constructor(private afs:AngularFirestore,private af:AngularFireAuth , public authService:AuthService) {

    this.authService.user.subscribe((userdata) => {
      if(userdata){
        this.uid = userdata.uid;
      //  console.log(this.uid , userdata.uid);
        this.memberState = this.afs.doc<Member>(`members/${this.uid}`);
      }
    });
    this.membersCollection = this.afs.collection('members');

  }


ngOnInit(){
  //  console.log(this.uid);
}

  getData(): Observable<Member[]> {
    return this.membersCollection.valueChanges();
  }

  getSnapshot(): Observable<Member[]> {
    // ['added', 'modified', 'removed']
    return this.membersCollection.snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data() as Member;

        return { id: a.payload.doc.id, memberuid:data.memberuid , memberphoto:data.memberphoto , membername: data.membername , membercity: data.membercity, memberorg: data.memberorg, memberdesc:data.memberdesc, time: data.time ,memberskills:data.memberskills,memberhobbies:data.memberhobbies,memberweb:data.memberweb};
      });
    });
  }



  getMember(id: string) {
    return this.afs.doc<Member>(`members/${id}`);
  }

  getMemberUID(uid:string):any{
    //console.log(uid);
    return this.afs.collection('members').doc(uid).ref.get().then((docSnapshot) => {
      if(docSnapshot.exists){
  //      console.log(docSnapshot, docSnapshot.data());
        return docSnapshot.data();
      }else{
        //console.log('No such doc');
        return '';
      }
    }).catch((err)=>{
      console.log('Error here brooo' ,err);
    });

//    return this.MemberReturnUid;
  }


  getMemberDetails(uid:string):any{
  return this.afs.collection('members').doc(uid).ref.get().then((docSnapshot) => {
      if(docSnapshot.exists){
        //console.log(docSnapshot, docSnapshot.data());
        return docSnapshot.data();
      }else{
        //console.log('No such doc');
        return '';
      }
    }).catch((err)=>{
      console.log('Error here brooo' ,err);
    });

//    return this.MemberReturnUid;
  }

  create(membername: string,memberphoto: string,  memberuid:string,membercity:string,memberorg:string,
          memberdesc:string,memberskills:string,memberhobbies:string,memberweb:string) {
    const member = {
      membername,
      memberphoto,
      memberuid,
      membercity,
      memberorg,
      memberdesc,
      memberskills,
      memberhobbies,
      memberweb,
      time: new Date().getTime(),
      adminRole:false,
    };
    return this.afs.doc<Member>(`/members/${memberuid}`).set(member);
//    return this.membersCollection.add(member);
  }

  updateMember(id: string, data: Partial<Member>) {
    return this.getMember(id).update(data);
  }

  deleteMember(id: string) {
    return this.getMember(id).delete();
  }
}
