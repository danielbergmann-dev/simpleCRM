/* import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WetterService {

  apiKey = '7943953881a940528b678aa00a5cafd4';
  apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

  constructor(private http: HttpClient) { }

  getWetter(stadt: string) {
    return this.http.get(this.apiUrl + stadt + '&appid=' + this.apiKey);
  }
}
 */
/* import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WetterService {

  apiKey = '7943953881a940528b678aa00a5cafd4';
  apiUrl = 'https://api.openweathermap.org/data/2.5/weather?';

  constructor(private http: HttpClient) { }

  getWetter(stadt: string) {
    return this.http.get(this.apiUrl + 'q=' + stadt + '&units=metric&appid=' + this.apiKey);
  }
}
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WetterService {

  apiKey = '7943953881a940528b678aa00a5cafd4';
  apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?';

  constructor(private http: HttpClient) { }

  getWetter(stadt: string) {
    return this.http.get(this.apiUrl + 'q=' + stadt + '&units=metric&appid=' + this.apiKey);
  }
}

