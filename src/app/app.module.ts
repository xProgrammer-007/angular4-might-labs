import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CookieModule } from 'ngx-cookie';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


import {SharedModule} from './shared/shared.module';
import { OverviewComponent } from './overview/overview.component';
import { StudentzoneComponent } from './studentzone/studentzone.component';
import { WhyusComponent } from './whyus/whyus.component';
import { GitComponent } from './gitrepository/git.component';
import { AboutComponent } from './about/about.component';
import { SigninComponent } from './signin/signin.component';
import { UpgradeComponent } from './upgrade/upgrade.component';

import {ProfileComponent} from './membersarea/profile/profile.component';
import {AboutProfileComponent} from './membersarea/profile/about/about.component';

import { MembersComponent  } from './membersarea/members.component';
import { MemberProfilesComponent  } from './membersarea/memberprofiles/memberprofiles.component';
import { MemberDetailsComponent } from './membersarea/memberdetails/memberdetails.component';
import { GitModule } from './gitrepository/git/shared/git.module';
import { CommunityModule } from './community/shared/community.module';
import { GroupChatComponent } from './membersarea/groupchat/groupchat.component';
import { ReversePipe } from './membersarea/groupchat/reverse.pipe';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

// Paste in your credentials that you saved earlier
var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};


import {MemberInfoService} from './membersarea/memberinfo/memberinfo.service';
import {AuthService} from './services/auth.service';
import {NotifyService} from './services/notify.service';
import {StudentService} from './studentzone/studentstats/studentservice';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    StudentzoneComponent,
    GroupChatComponent,
    WhyusComponent,
    GitComponent,
    AboutComponent,
    SigninComponent,
    UpgradeComponent,
    MembersComponent,
    MemberProfilesComponent,
    MemberDetailsComponent,
    ReversePipe,
    ProfileComponent,
    AboutProfileComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    ComponentsModule,
    MatTabsModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),  // Add this
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    GitModule,
    CommunityModule,
    CookieModule.forRoot()
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},AuthService,MemberInfoService,StudentService,NotifyService,ReversePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
