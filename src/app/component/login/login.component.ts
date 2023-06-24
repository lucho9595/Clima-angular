import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUsers: FormGroup

  constructor(private fb: FormBuilder, private auth: AngularFireAuth, private toastr: ToastrService, private router: Router) {
    this.loginUsers = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  async login() {
    try {
      const email = this.loginUsers.value.email;
      const password = this.loginUsers.value.password;

      await this.auth.signInWithEmailAndPassword(email, password)

      this.router.navigate(['home'])
    } catch (error) {

    }
  }
}