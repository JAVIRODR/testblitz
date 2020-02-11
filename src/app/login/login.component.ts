import { Component, OnInit, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GetUserIdService } from '../get-user-id.service';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    FormsModule, ButtonModule
  ],
  providers: [],
  bootstrap: []
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userCookie = 'UNKNOWN';

  private userID: string;
  public email: string;
  public password: string;
  public errorcode: any;
  
  constructor(private afs: AngularFirestore, private rt: Router,
    private cookieService: CookieService, private ua: GetUserIdService,) {
  }


  ngOnInit() {
    this.cookieService.delete('user');
  }

  mainLogin(){
    var fbauth = firebase.auth();
    console.log("starting main login")
    var user = fbauth.signInWithEmailAndPassword(this.email, this.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
        location.reload();
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });

    this.userID = firebase.auth().currentUser.uid;
    this.cookieService.set('user', this.userID);

    //handles navigating after a valid login
    //https://angularfirebase.com/lessons/router-guards-to-redirect-unauthorized-firebase-users/
    //the above link is used to redirect unauthorized users
    fbauth.onAuthStateChanged(user => {
      var that = this;
      if (user) {
        console.log("User signed in")
        this.rt.navigateByUrl('app-user-info');
      } else {
        console.log("No user logged in")
      }
    });

    
  }

  createAccount(){
    this.rt.navigateByUrl('app-signup-page')
  }

  forgotPassword(){
    var auth = firebase.auth();
    var emailAddress = this.email;

    auth.sendPasswordResetEmail(emailAddress).then(function() {
      console.log("email sent")
    }).catch(function(error) {
      // An error happened.
    });
  }

  sendUserVerifyEmail(){
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
      // Email sent.
      }).catch(function(error) {
      // An error happened.
    });
  }
}
