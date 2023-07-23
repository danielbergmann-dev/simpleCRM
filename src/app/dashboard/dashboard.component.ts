import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { WeatherService } from '../weather.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userCount!: number;
  usersCheckInOut!: any;
  weatherData: any;

  constructor(private dataService: DataService, private weatherService: WeatherService) { }

  ngOnInit() {
    this.dataService.getUserCount().subscribe(count => {
      this.userCount = count;
    });

    this.weatherService.getWeatherData('Berlin').subscribe(data => {
      this.weatherData = data;
      console.log(this.weatherData);
      
    });

/*     this.dataService.getUsersCheckInOut().subscribe(data => {
      this.usersCheckInOut = data;
    }); */
  }
}
