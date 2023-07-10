import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = 'https://api.api-ninjas.com/v1/cars?limit=10&make=';
  apiKey = 'n3tLr/cqE5/EcyJ8cZ9B9w==cVhxZ1PcriYBxRcq';

  constructor(private http: HttpClient) { }

  getCarData(make: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${make}`, {
      headers: { 'X-Api-Key': this.apiKey }
    });
  }
  
}
