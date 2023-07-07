import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class WetterService {

  apiKey = '7943953881a940528b678aa00a5cafd4';
  forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?';
  currentApiUrl = 'https://api.openweathermap.org/data/2.5/weather?';

  constructor(private http: HttpClient) { }

  getWetterByCoords(lat: string, lon: string) {
    return this.http.get(`${this.forecastApiUrl}lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`);
  }
  

  getWetter(stadt: string) {
    return this.http.get(this.forecastApiUrl + 'q=' + stadt + '&units=metric&appid=' + this.apiKey);
  }

  getCurrentWetter(stadt: string) {
    return this.http.get(this.currentApiUrl + 'q=' + stadt + '&units=metric&appid=' + this.apiKey);
  }

  getCurrentWetterByCoords(lat: string, lon: string): Observable<any> {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=de`;
    return this.http.get(url);
  }
  
}