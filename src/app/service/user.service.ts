import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: AngularFireAuth) { }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logOut() {
    return this.auth.signOut()
  }

  googleAuth() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  gitHubAuth() {
    this.auth.signInWithPopup(new firebase.auth.GithubAuthProvider())
  }

}