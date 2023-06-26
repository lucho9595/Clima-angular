import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataUser: any;

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
  ) { }

  ngOnInit(): void {
    this.auth.currentUser.then((user) => {
      if (user && user?.emailVerified) {
        this.dataUser = user
        console.log(this.dataUser)
      } else {
        this.router.navigate(['login'])
      }
    })
  }

  logOut() {
    this.auth.signOut()
      .then(() => {
        this.router.navigate(['login'])
      })
  }

}