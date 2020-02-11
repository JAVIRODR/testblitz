import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class GetUserIdService {

  private userID: string;

  constructor() { }

  setUserId(userIdIn: string) {
    this.userID = userIdIn;
  }

  getUserId() {
    return firebase.auth().currentUser.uid;
  }
}
