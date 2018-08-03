import { Component, OnInit } from '@angular/core';

import { GitService } from '../shared/git.service';

import { Git } from '../shared/git';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'gits-list',
  templateUrl: './gits-list.component.html',
  styleUrls: ['./gits-list.component.scss'],
})
export class GitsListComponent implements OnInit {

  gits: Observable<Git[]>;
  showSpinner = true;

  constructor(private gitService: GitService) {
    this.gits = this.gitService.getGitsList();
  }


  hearts(id:string,uid:string,val:number){
    //console.log(id,uid);
  this.gitService.hearts(id,uid,val);
  }

  ngOnInit() {
    this.gits.subscribe((x) => {
      this.showSpinner = false;
    });
  }

  deleteGits() {
    this.gitService.deleteAll();
  }
}
