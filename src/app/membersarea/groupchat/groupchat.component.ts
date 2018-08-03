import {Component , OnInit , Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable } from "angularfire2/database-deprecated";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import {FormsModule, FormArray, FormBuilder,FormGroup} from '@angular/forms';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';


interface Message{
  msg:string;
  name:string;
  photo:string;
  time:number;
}

@Component({
  selector: 'app-group-chat',
  templateUrl: './groupchat.component.html',
  styleUrls: ['./groupchat.component.css']
})
export class GroupChatComponent implements OnInit {

messagecollection:AngularFirestoreCollection<Message>;
messages:Observable<Message[]>;
chatForm:FormGroup;
chatMessage:string;
userdata:any;

  constructor(private afs:AngularFirestore,public db:AngularFireDatabase, public authService:AuthService,private router:Router,private fb:FormBuilder) {
      this.authService.user.subscribe(data => {
        this.userdata = data;
        //console.log(this.userdata , data);
      });
      this.messagecollection = this.afs.collection('messages',(ref) => ref.orderBy('time','desc').limit(10));
//      (ref) => ref.orderBy('time', 'desc').limit(5)
      this.messages = this.messagecollection.valueChanges();//.map((x)=>{});

   }


createForm(){

}

addPost(){
  this.messagecollection.add({
    msg:this.chatMessage,
    name:this.userdata.displayName,
    photo:this.userdata.photoURL,
    time:new Date().getTime()
  });
  this.chatMessage = '';
}
  ngOnInit() {

  }

}
