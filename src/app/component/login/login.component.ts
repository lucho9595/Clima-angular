import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit(): void {

  }

  loginWithGitHub() {
    this.afAuth.signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((result) => {
        // Aquí puedes manejar la respuesta exitosa y redirigir o realizar otras acciones necesarias
      })
      .catch((error) => {
        // Aquí puedes manejar errores de inicio de sesión
      });
  }

  loginWithGoogle() {
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        // Aquí puedes manejar la respuesta exitosa y redirigir o realizar otras acciones necesarias
      })
      .catch((error) => {
        // Aquí puedes manejar errores de inicio de sesión
      });
  }
}