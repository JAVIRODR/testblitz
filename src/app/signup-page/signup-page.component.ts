import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router'
import { AngularFirestore } from 'angularfire2/firestore';
import { CookieService } from 'ngx-cookie-service';
import { GetUserIdService } from '../get-user-id.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  userCookie = 'UNKNOWN';

  model: any = {};
  public passLoginError: "Passwords Do Not Match";
  private password: string;
  private reentrypassword: string;
  private email: string;
  private username: string;
  private userID: string;
  private fullName: string;

  constructor(private rt: Router, private afs: AngularFirestore,
    private cookieService: CookieService, private ua: GetUserIdService) {
  }

  ngOnInit() {
  }

  createAccount(){
    var fb = firebase.auth();
    var user;
    console.log(this.username)

    if(this.password === this.reentrypassword){
        fb.createUserWithEmailAndPassword(this.email, this.password).catch(function(error) {
        });
      }
    else{
    }
    this.userID = this.ua.getUserId();
    this.cookieService.set('user', this.userID);
    this.userCookie = this.cookieService.get('user');

    //check to make sure userID and cookie are equal, if not, set cookie equal to userID
    if(this.userID != this.userCookie) {
      this.userCookie = this.userID;
    }

    fb.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        console.log("User signed in.")
      } else {
        // No user is signed in.
        console.log("No user currently signed in.")
      }
    });
    this.addUserToDb(this.userID);
    this.rt.navigateByUrl('app-login');
  }

  updateUser(){
    /*this.auth().user.updateProfile({
      displayName: this.username,
      photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(function() {
        // Update successful.
        console.log("Updated username: "+ this.username)
      }).catch(function(error) {
        // An error happened.
        console.log("Username not updated, error.")
      });*/
  }


  addUserToDb(userID) {
    var data = {
      name: this.fullName,
      username: this.username,
      email: this.email,
      active: true,
      pages: [''],
    };
    
    var setDoc = this.afs.collection('users').doc(userID).set(data);
  }
}
