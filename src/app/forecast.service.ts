import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  private readonly API_KEY = '7943953881a940528b678aa00a5cafd4';
  private readonly BASE_URL = `https://api.openweathermap.org/data/2.5/forecast`;

  constructor(private http: HttpClient) {}

  getFiveDayForecast(cityId: string): Observable<any> {
    return this.http.get<any>(
      `${this.BASE_URL}?id=${cityId}&appid=${this.API_KEY}`
    );
  }
}
