import { Component } from '@angular/core';
import { WetterService } from '../wetter.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  wetterDaten: any;
  vorschauDaten: any[] = [];

  constructor(private wetterService: WetterService) { }

  getWetter(stadt: string) {
    this.wetterService.getWetter(stadt)
    .subscribe({
      next: (data: any) => {
        this.wetterDaten = data;
        console.log(data);
        if(data.list) {
          this.vorschauDaten = data.list.slice(0, 24);
        } else {
          console.error('Keine "list" Eigenschaft im Antwortobjekt');
        }
      },
      error: err => console.error('Fehler beim Abrufen der Wetterdaten:', err),
      complete: () => console.log('Wetterdaten abgerufen')
    });
  }
}
