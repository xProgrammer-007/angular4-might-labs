import { Component , OnInit} from '@angular/core';
import {NotifyService} from '../services/notify.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent implements OnInit {

routePathDev:string = '/community/programming/';
routePathExp:string = '/community/exploits/';
routePathGame:string = '/community/gaming/';
routePathMecha:string = '/community/mechanical/';
routePathNat:string = '/community/nature/';
routePathTech:string = '/community/concepts/';

  constructor(private _notify:NotifyService) { }

  ngOnInit() {


      this._notify.notify('bottom','left','Sign into Members Section and explore it out','warning');
      this._notify.notify('top','right','Visit Community section to view posts and create one yourself','warning');

  }

}
