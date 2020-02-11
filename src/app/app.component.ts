import { Component} from '@angular/core';
import { Router } from '@angular/router'
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private rt: Router){
    console.log("HELLO")
  }

  ngOnInit(){
    firebase.initializeApp(
      {
        apiKey: "AIzaSyAZ3008CP-UlIjm1zLwCdu_chl5W88kspE",
        authDomain: "welproject-80e93.firebaseapp.com",
        databaseURL: "https://welproject-80e93.firebaseio.com",
        projectId: "welproject-80e93",
        storageBucket: "welproject-80e93.appspot.com",
        messagingSenderId: "787777218268"}
    );
  }
  openLogin() {
    this.rt.navigateByUrl('app-login')
  }
}

