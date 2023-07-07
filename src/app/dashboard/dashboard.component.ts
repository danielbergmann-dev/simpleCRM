import { Component, OnInit } from '@angular/core';
import { WetterService } from '../wetter.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  wetterDaten: any;
  vorschauDaten: any[] = [];
  currentWetterDaten: any;

  public chartLabels: string[] = []; // Zeiten
  public chartData: number[] = []; // Temperaturen

  public chartDataMax: number[] = []; // Max Temperaturen
  public chartDataMin: number[] = []; // Min Temperaturen

  public chartDataRain: number[] = []; // Niederschlagsmengen

  constructor(private wetterService: WetterService) {}

  ngOnInit() {
   /*  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude.toString();
        const longitude = position.coords.longitude.toString();
        this.wetterService.getWetterByCoords(latitude, longitude).subscribe({
          next: (data: any) => {
            this.wetterDaten = data;
            console.log(data);
            if (data.list) {
              this.vorschauDaten = data.list.slice(0, 3); // Verschieben Sie dies zuerst
              this.chartLabels = this.vorschauDaten.map((item) =>
                this.formatTime(item.dt_txt)
              );
              this.chartData = this.vorschauDaten.map((item) => item.main.temp);
              this.chartDataMax = this.vorschauDaten.map(
                (item) => item.main.temp_max
              );
              this.chartDataRain = this.vorschauDaten.map((item) =>
                item.rain ? item.rain['3h'] : 0
              );
            }
          },
        });
      });
    } */
  }

  getWetter(stadt: string) {
    this.wetterService.getWetter(stadt).subscribe({
      next: (data: any) => {
        this.wetterDaten = data;
        console.log(data);
        if (data.list) {
          this.vorschauDaten = data.list.slice(0, 3); // Verschieben Sie dies zuerst
          this.chartLabels = this.vorschauDaten.map((item) =>
            this.formatTime(item.dt_txt)
          );
          this.chartData = this.vorschauDaten.map((item) => item.main.temp);
          this.chartDataMax = this.vorschauDaten.map(
            (item) => item.main.temp_max
          );
          this.chartDataMin = this.vorschauDaten.map(
            (item) => item.main.temp_min
          );
          this.chartDataRain = this.vorschauDaten.map((item) =>
            item.rain ? item.rain['3h'] : 0
          );
        }
      },
    });

    this.wetterService.getCurrentWetter(stadt).subscribe({
      next: (data: any) => {
        this.currentWetterDaten = data;
        console.log(data);
      },
    });


  }



  formatTime(timeString: string) {
    const date = new Date(timeString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}
