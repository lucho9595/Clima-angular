import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataUser: any;
  locations: FormGroup;
  apiKey: string = 'fc2e233c8a4315260cb8626363899191';

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.locations = new FormGroup({
      city: new FormControl('')
    })
    // this.auth.currentUser.then((user) => {
    //   if (user && user?.emailVerified) {
    //     this.dataUser = user
    //     console.log(this.dataUser)
    //   } else {
    //     this.router.navigate(['login'])
    //   }
    // })
  }

  logOut() {
    this.auth.signOut()
      .then(() => {
        this.router.navigate(['login'])
      })
  }

  onSubmit() {
    console.log(this.locations)
  }

}