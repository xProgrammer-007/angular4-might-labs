import { Component, ElementRef , ViewChild ,OnInit} from '@angular/core';
import { TechnologyService } from '../shared/technology.service';
import { Technology } from '../shared/technology';
import {Router , ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class TechnologyPostDetailComponent {

  @ViewChild('bg') myBg;
  technologys: Observable<Technology>;
  showSpinner = true;
  technology:Technology = new Technology();

  constructor(private technologySvc: TechnologyService,public routes:ActivatedRoute) {
  this.technologys = this.technologySvc.getTechnology(this.routes.snapshot.params['num']);
  }


  hearts(uid:string,val:number){
  const id = this.routes.snapshot.params['num'];
  this.technologySvc.hearts(id,uid,val);
  }

  ngOnInit() {
    this.technologys.subscribe((x) => {
        //this.parseCode(x.body);
        x.body = this.parseData(x.body);
        //this.parseImage(x.body);
        this.technology = Object.assign({},x);
        console.log(this.technology);
        setTimeout(()=>{
        this.showSpinner = false;
      },1000);
    });

    var arr = ['bg1','bg2','bg3','bg4'];
    const rnd = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
    const basepath = '../../../assets/img/';
    var pic = basepath + arr[rnd] + '.jpg';
    //console.log(this.myBg.nativeElement,this.myBg.nativeElement.style.backgroundImage);
    this.myBg.nativeElement.style.backgroundImage = 'url(' + pic + ')';
  }


safe_tags(str:any):any {
      return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') ;
  }


parseData(data:any):any{
  return this.parseCode(this.parseYoutube(this.parseImage(this.parseUrl(this.safe_tags(data)))));
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


}
