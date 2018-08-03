import { Component, ElementRef , ViewChild ,OnInit} from '@angular/core';
import { GitService } from '../shared/git.service';
import { Git } from '../shared/git';
import {Router , ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'git-detail',
  templateUrl: './git-detail.component.html',
  styleUrls: ['./git-detail.component.scss']
})
export class GitDetailComponent {

  @ViewChild('bg') myBg;
  gits: Observable<Git>;
  showSpinner = true;
  git:Git = new Git();

  constructor(private gitSvc: GitService,private routes:ActivatedRoute) {
  this.gits = this.gitSvc.getGit(this.routes.snapshot.params['num']);
  }


  hearts(id:string,uid:string,val:number){
    //console.log(id,uid);
  this.gitSvc.hearts(id,uid,val);
  }

  ngOnInit() {
    this.gits.subscribe((x) => {
        this.git = Object.assign({},x);
        //console.log(this.git);
        this.showSpinner = false;
    });

    var arr = ['bg1','bg2','bg3','bg4'];
    const rnd = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
    const basepath = '../../../assets/img/';
    var pic = basepath + arr[rnd] + '.jpg';
    //console.log(this.myBg.nativeElement,this.myBg.nativeElement.style.backgroundImage);
    this.myBg.nativeElement.style.backgroundImage = 'url(' + pic + ')';
  }

}
