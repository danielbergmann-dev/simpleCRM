import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RainviewerService {
  private apiUrl = 'https://api.rainviewer.com/public/weather-maps.json';

  constructor(private http: HttpClient) { }

  getRainData() {
    return this.http.get(this.apiUrl);
  }
}
