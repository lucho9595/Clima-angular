import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API_KEY = environment.API_KEY;
const API_URL = environment.API_URL;

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    URI: string = ''

    constructor(private http: HttpClient) {
        this.URI = `${API_URL}/weather?appid=${API_KEY}&units=metric&q=`
    }

    getWeather(location: any) {
        return this.http.get(`${this.URI}${location}`)
    }

}