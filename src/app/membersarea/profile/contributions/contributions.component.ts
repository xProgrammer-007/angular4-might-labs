import {Component , OnInit , Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router , ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/map';
import {Member} from '../../memberinfo/memberinfo';
import {MemberInfoService} from '../../memberinfo/memberinfo.service';

@Component({
  selector:'app-profile-about',
  templateUrl:'./about.component.html',
  styleUrls:['./about.component.scss'],
})


export class ContributionsProfileComponent implements OnInit{

navLinks =   [
            {path:'' , label:'About'},
            {path:'posts' , label:'Posts'},
            {path:'achievements' , label:'Achievements & Rank'},
            {path:'contributions' , label:'Contributions'},
            ];

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

  constructor(
    private memberInfoService:MemberInfoService,
    private routes:ActivatedRoute){

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
