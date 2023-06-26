import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { CodeErrorService } from 'src/app/service/code-error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUsers: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
    private auth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private fireBaseError: CodeErrorService) {
    this.loginUsers = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  login() {
    const email = this.loginUsers.value.email;
    const password = this.loginUsers.value.password;

    this.loading = true;

    this.auth.signInWithEmailAndPassword(email, password).then((user) => {
      if (user.user?.emailVerified) {
        this.toastr.success("Acceso granted", "User Logged In")
        this.router.navigate(['home'])
      } else {
        this.router.navigate(['verificar-correo'])
      }
    }).catch((error) => {
      console.log(error);
      this.loading = false;
      this.toastr.error(this.fireBaseError.codeError(error.code), 'Error')
    })
  }

  googleAuth() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  gitHubAuth() {
    this.auth.signInWithPopup(new firebase.auth.GithubAuthProvider())
  }

}