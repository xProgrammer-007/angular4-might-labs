import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Git } from '../shared/git';

import { GitService } from '../shared/git.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

import {NotifyService} from '../../../services/notify.service';
@Component({
  selector: 'git-form',
  templateUrl: './git-form.component.html',
  styleUrls: ['./git-form.component.scss'],
})
export class GitFormComponent {


  git: Git = new Git();
  username:string;
  photourl:string;
  uid:string;

  constructor(private gitSvc: GitService,private authService:AuthService,private notifyService:NotifyService,private router:Router) {
      this.authService.user.subscribe((auth)=>{
        if(auth){
          this.username = auth.displayName;
          this.photourl = auth.photoURL;
          this.uid      = auth.uid;
        }else{
          this.notifyService.notify('top','center','Creating your account on Might Labs takes a second ! . Sign in with Facebook or Google or Twitter to get started or continue','warning');
          this.router.navigate(['signin']);
          }
      })
   }

  createGit() {
    this.git.timeStamp = new Date().getTime();
    this.git.hearts = 0;
    this.git.uid = this.uid;
    this.git.photourl = this.photourl;
    this.git.username = this.username;
    //console.log(this.git);

    this.gitSvc.createGit(this.git);
    this.git = new Git(); // reset git
  }
}
