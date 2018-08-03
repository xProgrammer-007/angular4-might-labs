import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [

    trigger('explainerAnim', [
          transition('* => *', [
            query('.col', style({ opacity: 0, transform: 'translateX(-40px)' })),

            query('.col', stagger('500ms', [
              animate('800ms .5s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
            ])),

            query('.col', [
              animate(1000, style('*'))
            ])

          ])
        ])

  ]
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


}
