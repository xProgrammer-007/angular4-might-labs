import { NgModule , ModuleWithProviders} from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { OverviewComponent } from './overview/overview.component';
import { StudentzoneComponent } from './studentzone/studentzone.component';
import { WhyusComponent } from './whyus/whyus.component';
import { GitComponent } from './gitrepository/git.component';
import { AboutComponent } from './about/about.component';
import { SigninComponent } from './signin/signin.component';
import { UpgradeComponent } from './upgrade/upgrade.component';

import { MembersComponent  } from './membersarea/members.component';
import { MemberProfilesComponent  } from './membersarea/memberprofiles/memberprofiles.component';
import { MemberDetailsComponent } from './membersarea/memberdetails/memberdetails.component';
import { ProfileComponent , routeProfile} from './membersarea/profile/profile.component';

import {GitsListComponent} from './gitrepository/git/gits-list/gits-list.component';
import {GitDetailComponent} from './gitrepository/git/git-detail/git-detail.component';
import {GitFormComponent} from './gitrepository/git/git-form/git-form.component';

import {CommunityListComponent } from './community/community-list/community-list.component';

import {DevsComponent} from './community/Devs/devs.component';

import {DevPostFormComponent} from './community/Devs/post-form/post-form.component';
import {DevPostDetailComponent} from './community/Devs/post-detail/post-detail.component';

import {ExploitPostFormComponent} from './community/Exploits/post-form/post-form.component';
import {ExploitPostDetailComponent} from './community/Exploits/post-detail/post-detail.component';

import {GamePostFormComponent} from './community/Gaming/post-form/post-form.component';
import {GamePostDetailComponent} from './community/Gaming/post-detail/post-detail.component';

import {MechanicalPostFormComponent} from './community/Mechanical/post-form/post-form.component';
import {MechanicalPostDetailComponent} from './community/Mechanical/post-detail/post-detail.component';

import {NaturePostFormComponent} from './community/Nature/post-form/post-form.component';
import {NaturePostDetailComponent} from './community/Nature/post-detail/post-detail.component';

import {TechnologyPostFormComponent} from './community/Tech/post-form/post-form.component';
import {TechnologyPostDetailComponent} from './community/Tech/post-detail/post-detail.component';

import {GamesComponent} from './community/Gaming/gaming.component';
import {ExploitsComponent} from './community/Exploits/exploits.component';
import {MechanicalComponent} from './community/Mechanical/mechanical.component';
import {NatureComponent} from './community/Nature/nature.component';
import {TechnologyComponent} from './community/Tech/technology.component';

import {AboutProfileComponent} from './membersarea/profile/about/about.component';

import {AuthGuard} from './services/auth.guard';

const router: Routes =[
    { path: 'overview',       component: OverviewComponent },
    { path: 'studentzone',    component: StudentzoneComponent },
    { path: 'community',
      children:[
        {path:  'gaming' ,                   component:GamesComponent },
        {path:  'exploits',              component:ExploitsComponent},
        {path:  'programming',              component:DevsComponent},
        {path:  'mechanical',              component:MechanicalComponent},
        {path:  'nature',              component:NatureComponent},
        {path:  'concepts',              component:TechnologyComponent},

        {path:  'gaming/:create',      component:GamePostFormComponent},
        {path: 'gaming/:post/:num',   component: GamePostDetailComponent},

        {path:  'exploits/:create',      component:ExploitPostFormComponent},
        {path: 'exploits/:post/:num',   component: ExploitPostDetailComponent},

        {path:  'programming/:create',      component:DevPostFormComponent},
        {path: 'programming/:post/:num',   component: DevPostDetailComponent},

        {path:  'mechanical/:create',      component:MechanicalPostFormComponent},
        {path: 'mechanical/:post/:num',   component: MechanicalPostDetailComponent},

        {path:  'nature/:create',      component:NaturePostFormComponent},
        {path: 'nature/:post/:num',   component: NaturePostDetailComponent},

        {path:  'concepts/:create',      component:TechnologyPostFormComponent},
        {path: 'concepts/:post/:num',   component: TechnologyPostDetailComponent},



        {path:  '',                          component:CommunityListComponent}

      ]
    },
    { path: 'signin',         component: SigninComponent },
    { path: 'whyus',          component: WhyusComponent },
    { path: 'git',
      children:[
          { path: ':create',           component: GitFormComponent },
          { path: ':id/:num',           component: GitDetailComponent},
          { path: '',               component:GitsListComponent}
      ]
    },

    { path: 'about',          component: AboutComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path:'member/:id',      component: MemberDetailsComponent ,canActivate: [AuthGuard]},
    { path:'profile/:id',         component:ProfileComponent },
    { path:'membersarea',     component: MembersComponent ,canActivate: [AuthGuard]},
    { path:'members',         component: MemberProfilesComponent ,canActivate: [AuthGuard]},
    { path: '',               redirectTo: 'overview', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(router)
  ],
  exports: [
  ],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
export const routes: ModuleWithProviders = RouterModule.forRoot(router);
