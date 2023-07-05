import { Component } from '@angular/core';
import { WetterService } from '../wetter.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  wetterDaten: any;

  constructor(private wetterService: WetterService) { }

  getWetter(stadt: string) {
    this.wetterService.getWetter(stadt)
    .subscribe(
      data => { this.wetterDaten = data; },
      err => console.error(err),
      () => console.log('Wetterdaten abgerufen')
    );
  }
}








