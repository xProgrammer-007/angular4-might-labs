import { Component, OnInit , Inject} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';
declare var $: any;
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {


  constructor(public af: AngularFireAuth, private router: Router,
              public authService:AuthService) {
                if(this.authService.user){
                  this.router.navigate(['/membersarea']);
                }
              }

                signInWithGithub() {
                  this.authService.githubLogin()
                  .then(() => this.afterSignIn());
                }

                signInWithGoogle() {
                  this.authService.googleLogin()
                    .then(() => this.afterSignIn());
                }

                signInWithFacebook() {
                  this.authService.facebookLogin()
                    .then(() => this.afterSignIn());
                }

                signInWithTwitter() {
                  this.authService.twitterLogin()
                    .then(() => this.afterSignIn());
                }

                /// Anonymous Sign In

                signInAnonymously() {
                  this.authService.anonymousLogin()
                    .then(() => this.afterSignIn());
                }

                /// Shared

                private afterSignIn() {
                  // Do after login stuff here, such router redirects, toast messages, etc.
                  this.router.navigate(['/membersarea']);
                }

                ngOnInit() {
                }

                showNotification(from, align){
      const type = ['','info','success','warning','danger'];

      const color = Math.floor((Math.random() * 4) + 1);

      $.notify({
          icon: "notifications",
          message: "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer."

      },{
          type: type[color],
          timer: 4000,
          placement: {
              from: from,
              align: align
          }
      });
  }
}
