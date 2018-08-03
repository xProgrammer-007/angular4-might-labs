import { Component, OnInit } from '@angular/core';
import {AngularFirestore , AngularFirestoreDocument , AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {switchMap} from 'rxjs/Operators';
import * as Chartist from 'chartist';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import {MemberInfoService} from '../membersarea/memberinfo/memberinfo.service';
import {Member} from '../membersarea/memberinfo/memberinfo';
import {student} from '../studentzone/studentstats/studentInterface';
import {StudentService} from '../studentzone/studentstats/studentservice';
import {graph} from './graph.model';



@Component({
  selector: 'app-whyus',
  templateUrl: './whyus.component.html',
  styleUrls: ['./whyus.component.css']
})
export class WhyusComponent implements OnInit {

members:Observable<student[]>;
graphObj$:Observable<graph>;
graphItem:AngularFirestoreDocument<graph>;

graphType:boolean = true;
  constructor(private afs:AngularFirestore,private studentService:StudentService) {
    this.members = this.studentService.getData();
   }


getGraphed(uid:string){
  console.log(uid);
  this.graphItem = this.afs.doc(`students/${uid}`);
  this.graphObj$ = this.graphItem.valueChanges();
  this.showGraph();
}


showGraph(){
if(typeof this.graphObj$ == 'undefined'){
  return;
}
this.graphObj$ = this.graphItem.valueChanges();
  this.graphObj$.subscribe((data)=>{

    const pieChartConf:any = {
      lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
      }),
      donut: true,
      donutWidth: 60,
      donutSolid: true,
      startAngle: 270,
      showLabel: true
    };

    const dataDailySalesChart: any = {
        labels: data.graphlabel,
        series: [
              data.graphSeries1,
              data.graphSeries2,
              data.graphSeries3,
        ]
    };

    const optionsDailySalesChart: any = {
         lineSmooth: Chartist.Interpolation.cardinal({
             tension: 0
         }),
         low: 0,
         high: 100, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
         chartPadding: { top: 10, right: 10, bottom: 10, left: 10},
         height:'350px',
         axisY: {
          onlyInteger: true,
          offset: 50
        }
     };

    if(this.graphType == true){
       setTimeout(()=>{
         var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);
         this.startAnimationForLineChart(dailySalesChart);
       },1500);
     }else{
       setTimeout(()=>{
         var dailySalesChart = new Chartist.Bar('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);
         this.startAnimationForBarChart(dailySalesChart);
       },1500);
    }

    var pie1 =  new Chartist.Pie('#pie1', {
      series: data.graphSeries1
    }, pieChartConf);

    var pie1 =  new Chartist.Pie('#pie2', {
      series: data.graphSeries2
    }, pieChartConf);

    var pie1 =  new Chartist.Pie('#pie3', {
      series: data.graphSeries3
    }, pieChartConf);

  });
}


changeType(){
  console.log('xoxooxhi');
  this.graphType = !this.graphType;
  console.log(this.graphType);
  this.showGraph();
}



   startAnimationForLineChart(chart){
       let seq: any, delays: any, durations: any;
       seq = 0;
       delays = 80;
       durations = 500;

       chart.on('draw', function(data) {
         if(data.type === 'line' || data.type === 'area') {
           data.element.animate({
             d: {
               begin: 600,
               dur: 700,
               from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
               to: data.path.clone().stringify(),
               easing: Chartist.Svg.Easing.easeOutQuint
             }
           });
         } else if(data.type === 'point') {
               seq++;
               data.element.animate({
                 opacity: {
                   begin: seq * delays,
                   dur: durations,
                   from: 0,
                   to: 1,
                   easing: 'ease'
                 }
               });
           }
       });

       seq = 0;
   };
   startAnimationForBarChart(chart){
       let seq2: any, delays2: any, durations2: any;

       seq2 = 0;
       delays2 = 80;
       durations2 = 500;
       chart.on('draw', function(data) {
         if(data.type === 'bar'){
             seq2++;
             data.element.animate({
               opacity: {
                 begin: seq2 * delays2,
                 dur: durations2,
                 from: 0,
                 to: 1,
                 easing: 'ease'
               }
             });
         }
       });

       seq2 = 0;
   };


  ngOnInit() {
  }

}
