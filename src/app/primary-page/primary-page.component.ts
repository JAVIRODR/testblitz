import { Component, OnInit, NgModule } from '@angular/core';
import { AppComponent } from '../app.component';
import * as firebase from 'firebase';
import { GetUserIdService } from '../get-user-id.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { CookieService } from 'ngx-cookie-service';

//https://www.primefaces.org/primeng/#/menumodel

@NgModule({
  declarations: [
    
  ],
  imports: [
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
@Component({
  selector: 'app-primary-page',
  templateUrl: './primary-page.component.html',
  styleUrls: ['./primary-page.component.css']
})
export class PrimaryPageComponent implements OnInit {
  pageCookie = 'Gc6LErnIucTuD0rePtOH';
  userCookie = 'UNKNOWN';


  private userId: string;
  public newComment: string;
  public pageData: string;

  constructor(private ua: GetUserIdService, private afs: AngularFirestore,
    private cookieService: CookieService){
    this.userId = ua.getUserId();
  }
  ngOnInit() {
    this.pageCookie = this.cookieService.get('pageID');
    this.userCookie = this.cookieService.get('user');
    this.readPageData();
  }

  postComment(){
    var userID = this.userCookie;
    var data = {
      comment: [this.newComment, firebase.firestore.FieldValue.serverTimestamp()]
    };

    console.log(data);

    var comment = document.createElement("p");
    comment.innerHTML = this.newComment;
    document.getElementById("comments").appendChild(comment);
    
    var setDoc = this.afs.collection('pages').doc(this.pageCookie).collection('comments').
    doc(userID).set(data);
    
    //reset the text value in field    
  }

  returnComment(){
    var commentRef = this.afs.collection('pages').doc(this.pageCookie).collection('comments').
    doc('commentData');
    var commentDisplay = commentRef.get().subscribe(snapshot => {
      var commentData = snapshot.get('comment');
      this.newComment = commentData[1];
    });
  }


  readPageData(){
      var pageDataRef = this.afs.collection('pages').doc('Gc6LErnIucTuD0rePtOH');
      var dataRef = pageDataRef.get().subscribe(snapshot =>{
        this.pageData = snapshot.get('pageData');
        console.log(this.pageData);
      });
  }
}
