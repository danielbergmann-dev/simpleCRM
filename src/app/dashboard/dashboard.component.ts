import { Component, OnInit } from '@angular/core';
import { WetterService } from '../wetter.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  wetterDaten: any;
  vorschauDaten: any[] = [];
  currentWetterDaten: any;

  constructor(private wetterService: WetterService) { }

  ngOnInit() {
    
  }

  getWetter(stadt: string) {
    this.wetterService.getWetter(stadt)
    .subscribe({
      next: (data: any) => {
        this.wetterDaten = data;
        console.log(data);
        if(data.list) {
          this.vorschauDaten = data.list.slice(0, 3);
        } else {
          console.error('Keine "list" Eigenschaft im Antwortobjekt');
        }
      },
      error: err => console.error('Fehler beim Abrufen der Wetterdaten:', err),
      complete: () => console.log('Wetterdaten abgerufen')
    });

    this.wetterService.getCurrentWetter(stadt)
    .subscribe({
      next: (data: any) => {
        this.currentWetterDaten = data;
        console.log(data);
      },
      error: err => console.error('Fehler beim Abrufen der aktuellen Wetterdaten:', err),
      complete: () => console.log('Aktuelle Wetterdaten abgerufen')
    });
  }
}