import {Component , OnInit , Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../../services/auth.service';
import {Router , ActivatedRoute} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable } from "angularfire2/database-deprecated";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import {Member} from '../memberinfo/memberinfo';
import {MemberInfoService} from '../memberinfo/memberinfo.service';

@Component({
  selector:'app-memberdetails',
  templateUrl:'./memberdetails.component.html',
  styleUrls:['./memberdetails.component.css'],
})


export class MemberDetailsComponent implements OnInit{


  SelectedMember:any;
  loaded:boolean= false;
  loadedCheck:boolean=false;
  admin:boolean;
   userObj = {
      Name:'',
      Desc:'',
      City:'',
      Org:'',
      Photo:'',
      Skills:'',
      Hobbies:'',
      Web:'',
      adminRole:false
  };

  constructor(public af:AngularFireAuth,private memberInfoService:MemberInfoService,private afs:AngularFirestore,public db:AngularFireDatabase, public authService:AuthService,private routes:ActivatedRoute){

  }

ngOnInit(){
 this.SelectedMember = this.memberInfoService.getMemberUID(this.routes.snapshot.params['id'])
   .then((data) => {
    this.userObj.Name = data.membername;
    this.userObj.Desc = data.memberdesc;
    this.userObj.City = data.membercity;
    this.userObj.Org = data.memberorg;
    this.userObj.Photo = data.memberphoto;
    this.userObj.Skills = data.memberskills;
    this.userObj.Hobbies = data.memberhobbies;
    this.userObj.Web = data.memberweb;
    this.userObj.adminRole = data.adminRole;


})
  setTimeout(()=>{
    this.loaded = !this.loaded;
  },1200);
}



}
