import { Component, OnInit , Input } from '@angular/core';

import { DevService } from '../shared/dev.service';

import { Dev } from '../shared/dev';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'dev-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class DevPostsListComponent implements OnInit {

  devs: Observable<Dev[]>;
  showSpinner = true;
  @Input() limit:number;
  @Input() routeLink;

  //[routeLink]="/community/programming/"

  constructor(private devService: DevService) {

  }


instrImg(data:any):string{
  var img =  new RegExp(/\[image](.*?)\[\/image\]/);
  if(img.test(data)){
    return data.match(img)[1];
  }else{
    return '../../../assets/img/dash.jpg';
  }

}

  hearts(id:string,uid:string,val:number){
    //console.log(id,uid);
  this.devService.hearts(id,uid,val);
  }

  ngOnInit() {
    if(this.limit == 0){
    this.devs = this.devService.getDevsList();
}    else {
    this.devs = this.devService.getDevsListLimit(this.limit);
}
    this.devs.subscribe((x) => {
      this.showSpinner = false;
    });
  }

  deleteDevs() {
    this.devService.deleteAll();
  }
}
