import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WeatherService } from 'src/app/service/weather.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataUser: any;
  locations: FormGroup;
  weathersData: any;
  filteredCities: string[] = [];
  darkModeActive: boolean = false;
  loading: boolean = false;

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private formBuilder: FormBuilder,
    private weather: WeatherService
  ) {
  }

  ngOnInit(): void {
    this.locations = this.formBuilder.group({
      location: [''],
    })
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

  sendToApi(formValues: any) {
    this.loading = true; // Mostrar el loading
    this.weather.getWeather(formValues.location).pipe(
      map(infos => {
        this.weathersData = infos;
        console.log(this.weathersData);
      })
    ).subscribe(() => {
      this.loading = false; // Ocultar el loading después de la respuesta
    });
    this.locations.get('location')?.reset();
  }

  applyDarkModeStyles() {
    const body = document.getElementsByTagName('body')[0];

    if (this.darkModeActive) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }
}