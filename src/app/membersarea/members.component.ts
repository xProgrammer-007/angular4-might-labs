import {Component , OnInit , Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable } from "angularfire2/database-deprecated";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import {FormsModule, FormArray, FormBuilder,FormGroup} from '@angular/forms';
import {Member} from './memberinfo/memberinfo';
import {MemberInfoService} from './memberinfo/memberinfo.service';
import { map , switchMap } from 'rxjs/operators';
import {StudentService} from '../studentzone/studentstats/studentservice';


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

@Component({
  selector:'app-memberscomponent',
  templateUrl:'./members.component.html',
  styleUrls:['./members.component.css']
})

export class MembersComponent implements OnInit{

  userForm:FormGroup;
  members:Observable<Member[]>;
  member:any;
  userdata:any;
  username:any;
  photourl:any;
  uid:any;
   datenow = new Date().getTime();
   timeleft:any;
timecond:boolean;
  constructor(private memberInfoService:MemberInfoService,private afs:AngularFirestore,public db:AngularFireDatabase, public authService:AuthService,private router:Router,private fb:FormBuilder,private studentService:StudentService){
    this.authService.user.subscribe((auth)=>{
      if(auth){
        this.username = auth.displayName;
        this.photourl = auth.photoURL;
        this.uid      = auth.uid;
  //      console.log(auth.uid , this.uid);

//        console.log(auth,this.username,this.photourl,this.uid,auth.adminRole,auth.readerRole);
        this.member = this.memberInfoService.getMemberUID(this.uid)
        .then((p) => {
//          console.log(p);
          this.member = p;
//          console.log('return value ',this.member);
          this.buildForm();

        });
      }

      });
  }


    callStatsReg(uid:string,name:string,photo:string){
      this.studentService.registerStudent(uid,name,photo);
    }

    callStatsCheck(uid:string){
      this.studentService.checkStudent(uid).then((p)=>{
      });
    }

ngOnInit(){

   this.buildFormBasic();
  }


  buildFormBasic(){
    this.userForm = this.fb.group({
      city:'',
      org:'',
      description:'',
      skills:'',
      hobbies:'',
      web:''
    });
  }

  buildForm(){
    this.userForm = this.fb.group({
      city:this.member.membercity,
      org:this.member.memberorg,
      description:this.member.memberdesc,
      skills:this.member.memberskills,
      hobbies:this.member.memberhobbies,
      web:this.member.memberweb
    });
  }

  formSubmit(e:Event){
    const date = Date();
    const {city,org,description,skills,hobbies,web} = this.userForm.value;
    const photourl = this.photourl;
    const uid = this.uid;
    const name = this.username;
  //  console.log({city,org,description,skills,hobbies,web,photourl,uid,name});
//    let formReq = {city, org , description , this.photourl, this.uid , this.username};
//    console.log(formReq);
    this.memberInfoService.create(name,photourl,uid,city,org,description,skills,hobbies,web);


  }

}
