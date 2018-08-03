import { Component, OnInit,Input } from '@angular/core';

import { NatureService } from '../shared/nature.service';

import { Nature } from '../shared/nature';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'nature-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class NaturePostsListComponent implements OnInit {

  natures: Observable<Nature[]>;
  showSpinner = true;
@Input() limit:number;
@Input() routeLink;
  constructor(private natureService: NatureService) {

  }


instrImg(data:any):string{
  var img =  new RegExp(/\[image]([^]*?)\[\/image\]/);
  if(img.test(data)){
    return data.match(img)[1];
  }else{
    return '../../../assets/img/dash.jpg';
  }

}

  hearts(id:string,uid:string,val:number){
    //console.log(id,uid);
  this.natureService.hearts(id,uid,val);
  }

  ngOnInit() {
    if(this.limit == 0){
        this.natures = this.natureService.getNaturesList();
    }else{
      this.natures = this.natureService.getNaturesListLimit(this.limit);
    }
    this.natures.subscribe((x) => {
      this.showSpinner = false;
    });
  }

  deleteNatures() {
    this.natureService.deleteAll();
  }
}
