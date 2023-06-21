import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  async signin(user: string, password: string) {
    try {
      await this.auth.signin(user, password)
      alert('User is created')
      this.router.navigate(['login'])
    } catch (e: any) {
      alert(e.message)
    }
  }

}