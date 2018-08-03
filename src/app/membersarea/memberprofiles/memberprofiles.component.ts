import {Component , OnInit , Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
import {Member} from '../memberinfo/memberinfo';
import {MemberInfoService} from '../memberinfo/memberinfo.service';
import {moveIn , fallIn} from '../../components/router.animations';

@Component({
  selector:'app-memberprofiles',
  templateUrl:'./memberprofiles.component.html',
  styleUrls:['./memberprofiles.component.css'],
  animations:[moveIn(),fallIn()]
})


export class MemberProfilesComponent implements OnInit{

  members:Observable<Member[]>;
  loaded:boolean= false;
  loadedCheck:boolean=false;
  admin:boolean;

  constructor(private memberInfoService:MemberInfoService,private router:Router){
      this.members = this.memberInfoService.getData();
  }

ngOnInit(){
  setTimeout(()=>{
    this.loaded = !this.loaded;
  },1000);
}



}
