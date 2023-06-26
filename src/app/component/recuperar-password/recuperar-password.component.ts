import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { CodeErrorService } from 'src/app/service/code-error.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {
  recoverUser: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
    private auth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private fireBaseError: CodeErrorService) {
    this.recoverUser = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  ngOnInit(): void {
  }

  recover() {
    const email = this.recoverUser.value.email;

    this.loading = true;
    this.auth.sendPasswordResetEmail(email).then(() => {
      this.toastr.info("We send you an email to recover your password", "Recover Password")
      this.router.navigate(['login'])
    }).catch((error) => {
      console.log(error);
      this.loading = false;
      this.toastr.error(this.fireBaseError.codeError(error.code), 'Error')
    })
  }
};