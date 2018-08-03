import { Component, OnInit ,Input} from '@angular/core';

import { TechnologyService } from '../shared/technology.service';

import { Technology } from '../shared/technology';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'technology-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class TechnologyPostsListComponent implements OnInit {

  technologys: Observable<Technology[]>;
  showSpinner = true;
@Input() limit:number;
@Input() routeLink;
  constructor(private technologyService: TechnologyService) {

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
  this.technologyService.hearts(id,uid,val);
  }

  ngOnInit() {
    if(this.limit == 0){
        this.technologys = this.technologyService.getTechnologysList();
    }else{
        this.technologys = this.technologyService.getTechnologysListLimit(this.limit);
    }
    this.technologys.subscribe((x) => {
      this.showSpinner = false;
    });
  }

  deleteTechnologys() {
    this.technologyService.deleteAll();
  }
}
