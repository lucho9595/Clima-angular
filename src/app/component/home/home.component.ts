import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private auth: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async logOut() {
    try {
      await this.auth.logOut()
      this.router.navigate(['login']);
    }
    catch (error) { };
  }
}