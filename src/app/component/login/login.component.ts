import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  async login(user: string, password: string) {
    try {
      await this.auth.login(user, password)
      this.router.navigate(['home'])
    } catch (e: any) {
      alert(e.message)
    }
  }

}