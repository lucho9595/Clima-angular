import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForms: FormGroup

  constructor(private fb: FormBuilder, private auth: AngularFireAuth, private route: Router, private toastr: ToastrService) {
    this.registerForms = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  register() {
    const email = this.registerForms.value.email;
    const password = this.registerForms.value.password;
    const repeatPassword = this.registerForms.value.repeatPassword;
    console.log(email, password, repeatPassword)

    this.auth.createUserWithEmailAndPassword(email, password).then((user) => {
      console.log(user)
      this.toastr.success("User created")
      this.route.navigate(['login'])
    }).catch((error) => {
      console.log(error)
      this.toastr.error(this.firebaseError(error.code), 'Error')
    })
  }

  firebaseError(code: string) {
    switch (code) {
      case "auth/email-already-in-use":
        return "Email exists, created other email"
      case "auth/weak-password":
        return "Password should be at least 6 characters"
      case "auth/missing-password":
        return "You must enter the password"
      case "auth/invalid-email":
        return "Put the email correctly"
      case "auth/missing-email":
        return "Ingrese email valid"
      default:
        return
    }
  }

}