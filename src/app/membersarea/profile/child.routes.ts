import {NgModule} from '@angular/core';
import {Router , ActivatedRoute} from '@angular/router';
import {ProfileComponent} from './profile.component';
import {AboutProfileComponent} from './about/about.component';
import {routes} from '../../../app.routing';


@NgModule({
  imports:[
    routes
  ]
})
export const routeProfile:Routes =[
    {
      path:'profile/:id' , component: ProfileComponent
      children:[
      {path:'', component:AboutProfileComponent,outlet:'about'},
      {path:'about', component:AboutProfileComponent,outlet:'about'},
      {path:'posts', component:AboutProfileComponent,outlet:'about'},
      {path:'achievements', component:AboutProfileComponent,outlet:'about'},
      {path:'contributions', component:AboutProfileComponent,outlet:'about'}
    ]
  }
];
