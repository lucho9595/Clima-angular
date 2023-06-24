import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUsers: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private auth: AngularFireAuth, private toastr: ToastrService, private router: Router) {
    this.loginUsers = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  login() {
    const email = this.loginUsers.value.email;
    const password = this.loginUsers.value.password;

    this.loading = true;

    this.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.loading = false;
      this.toastr.success("Acceso granted", "User Logged In")
      this.router.navigate(['home'])
    }).catch((error) => {
      console.log(error);
      this.loading = false;
      this.toastr.error(this.firebaseError(error.code), 'Error')
    })
  }


  firebaseError(code: string) {
    switch (code) {
      case "auth/weak-password":
        return "Password should be at least 6 characters"
      case "auth/missing-password":
        return "You must enter the password"
      case "auth/invalid-email":
        return "Put the email correctly"
      case "auth/missing-email":
        return "Ingrese email valid"
      case "auth/wrong-password":
        return "This password is invalid, insert the correct password"
      default:
        return
    }
  }


  googleAuth() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  gitHubAuth() {
    this.auth.signInWithPopup(new firebase.auth.GithubAuthProvider())
  }

}