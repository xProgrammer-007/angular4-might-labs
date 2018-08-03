import { Component, OnInit ,Input} from '@angular/core';

import { MechanicalService } from '../shared/mechanical.service';

import { Mechanical } from '../shared/mechanical';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'mechanical-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class MechanicalPostsListComponent implements OnInit {

  mechanicals: Observable<Mechanical[]>;
  showSpinner = true;
  @Input() limit:number;
    @Input() routeLink;
  constructor(private mechanicalService: MechanicalService) {

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
  this.mechanicalService.hearts(id,uid,val);
  }

  ngOnInit() {
    if(this.limit == 0){
      this.mechanicals = this.mechanicalService.getMechanicalsList();
    }else{
      this.mechanicals = this.mechanicalService.getMechanicalsListLimit(this.limit);
    }
    this.mechanicals.subscribe((x) => {
      this.showSpinner = false;
    });
  }

  deleteMechanicals() {
    this.mechanicalService.deleteAll();
  }
}
