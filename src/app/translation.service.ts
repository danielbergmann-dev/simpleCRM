import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
  private headers = {
    'content-type': 'application/x-www-form-urlencoded',
    'accept-encoding': 'application/gzip',
    'x-rapidapi-key': 'aa394f10b1mshac8d2eaf8a94280p1a872fjsn9846cfe0073f',
    'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
    'useQueryString': 'true'
  };

  constructor(private http: HttpClient) { }

  translate(text: string, targetLanguage: string): Observable<any> {
    const body = `q=${text}&target=${targetLanguage}`;
    return this.http.post(this.url, body, { headers: this.headers });
  }
}
