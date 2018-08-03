import { Component, OnInit ,ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Dev } from '../shared/dev';

import { DevService } from '../shared/dev.service';

import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

import {NotifyService} from '../../../services/notify.service';

declare var $:any;
@Component({
  selector: 'post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class DevPostFormComponent {


  dev: Dev = new Dev();
  enc:Dev = new Dev();
  username:string;
  photourl:string;
  uid:string;
  codeText:any;
@ViewChild('code') codeTextArea;
@ViewChild('bodyInput') postArea;

  constructor(private devSvc: DevService,private authService:AuthService,private notifyService:NotifyService,private router:Router) {
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
      this.enc.body = '';
      this.enc.title = '';
   }

  createDev() {
    this.dev.timeStamp = new Date().getTime();
    this.dev.hearts = 0;
    this.dev.uid = this.uid;
    this.dev.photourl = this.photourl;
    this.dev.username = this.username;
    //console.log(this.dev);

    this.devSvc.createDev(this.dev);
    this.dev = new Dev(); // reset dev
  }

  isPC():boolean{
    if($(window).width() > 700){
      return true;
    }else{
      return false;
    }
  }



safe_tags(str:any):any {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') ;
}

checkBody(){
  if(this.dev.body === undefined){
    this.dev.body = '';
  }
}

alertMsg(){
  //console.log(this.codeTextArea.nativeElement.value);
  this.enc.body = this.dev.body + '\n<code>' + this.safe_tags(this.codeTextArea.nativeElement.value) + '</code>';
  //console.log('enc body' ,this.enc.body);
  this.dev.body += '\n'+this.codeTextArea.nativeElement.value ;
  this.codeTextArea.nativeElement.value = '';
}


updatePost(e:Event){
var content = (e.target as HTMLInputElement).value;
this.enc.body = this.parseCode(this.parseYoutube(this.parseImage(this.parseUrl(this.safe_tags(content)))));
//console.log(this.enc.body);
}

parseUrl(data:any):any{
  return data.replace(/\[url\s?=\s?"?([^]*?)"?\]([^]*?)\[\/url\]/g, '<a href="$1">$2</a>');
}
parseImage(data:any):any{
  return data.replace(/\[image]([^]*?)\[\/image\]/g, '<div class = "row"><div class="col-md-9 col-md-offset-1"><a href="$1" target="_blank"><img class = "img img-responsive img-thumbnail" src="$1"></a></div></div>');
}
parseYoutube(data:string):string{
  return data.replace(/\[youtube]([^]*?)\[\/youtube\]/g,
   '<div class = "row"><div class="col-md-10 col-md-offset-1"><iframe style="width:100%" frameborder="0" allowfullscreen height="315" src="$1"></iframe></div></div>'
 );
}
parseCode(data:any):any{
  return data.replace(/\[code]([^]*?)\[\/code\]/gm,
   '<code>$1</code>').replace(/\`([^]*?)\`/gm ,'<code>$1</code>');
}

  url(){
    this.checkBody();
    this.dev.body += '\n[url="http://someurl.com"]\n Text here \n[/url]\n' ;
  }
  coding(){
    this.checkBody();
    this.dev.body += '\n[code]\n Write code here \n[/code]\n' ;
  }
  image(){
    this.checkBody();
    this.dev.body += '\n[image]\n Image url goes here \n[/image]' ;
  }
  youtube(){
    this.checkBody();
    this.dev.body += '\n[youtube]\n Youtube or any youtube here \n[/youtube]' ;
  }
}
