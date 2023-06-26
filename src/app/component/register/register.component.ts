import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { CodeErrorService } from 'src/app/service/code-error.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  registerForms: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private auth: AngularFireAuth, private route: Router, private toastr: ToastrService, private fireBaseError: CodeErrorService) {
    this.registerForms = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
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

    console.log(this.registerForms)
    if (password !== repeatPassword) {
      this.toastr.error('The password are not identical', 'Error');
      return;
    }

    this.loading = true;
    this.auth.createUserWithEmailAndPassword(email, password).then(() => {
      this.verifiquedEmail();
    }).catch((error) => {
      console.log(error)
      this.loading = false;
      this.toastr.error(this.fireBaseError.codeError(error.code), 'Error')
    })
  }

  verifiquedEmail() {
    this.auth.currentUser
      .then((user) => user?.sendEmailVerification())
      .then(() => {
        this.toastr.info("We send you an email for email verification", "Check mail");
        this.route.navigate(['login'])
      }).catch((error) => {
        console.log(error)
      })
  }

}