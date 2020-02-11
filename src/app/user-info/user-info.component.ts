import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';
import { CookieService } from 'ngx-cookie-service';
import { GetUserIdService } from '../get-user-id.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  userCookie = 'UNKNOWN';

  private user: any;
  private username: string;
  private email: string;
  private userID: string;
  private page1: any;
  private page2: any;
  private page3: any;
  private pageNameTest: string;
  

  private fba = firebase.auth();

  constructor(private afs: AngularFirestore, private cookieService: CookieService,
    private ua: GetUserIdService, private rt: Router) { 
    this.user = this.fba.currentUser;
  }

  ngOnInit() {
    if(this.user){
      this.userID = this.ua.getUserId();
      this.userCookie = this.cookieService.get('user');
      if(this.userID != this.userCookie) { this.userID = this.userCookie; }
      this.getCurrentUser();
      this.getUserPages();
    }
  }

  getCurrentUser(){
      var userRef = this.afs.collection('users').doc(this.userID);
      var users = userRef.get()
        .subscribe(snapshot => {
          //console.log(snapshot);
          this.username = snapshot.get('username');
          this.email = snapshot.get('email');
          });
  }

  getUserPages(){
    var pageArr = null;
    var pageRef = this.afs.collection('users').doc(this.userID);
    var pagesOwned = pageRef.get().subscribe(snapshot => {
      var pageArr = snapshot.get('pages');
      this.page1 = pageArr[0];
      this.page2 = pageArr[1];
      this.page3 = pageArr[2];
    });
  }

  setNewPassword(){
    /*
    var user = firebase.auth().currentUser;
    var newPassword = getASecureRandomPassword();

    user.updatePassword(newPassword).then(function() {
      // Update successful.
    }).catch(function(error) {
      // An error happened.
    });*/
  }

  resetEmail(){
    var emailAddress = this.email;

    this.fba.sendPasswordResetEmail(emailAddress).then(function() {
    // Email sent.
    console.log("email sent")
    }).catch(function(error) {
    // An error happened.
    });
  }

  signout(){
    this.cookieService.delete('user');
    this.fba.signOut().then(function() {
      // Sign-out successful.
      console.log('signout successful');
    }).catch(function(error) {
      // An error happened.
    });
    this.rt.navigateByUrl('app-login')
  }
}
