import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { WeatherService } from '../weather.service';
import { ForecastService } from '../forecast.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userCount!: number;
  usersCheckInOut!: any;
  weatherData: any;
  forecastData: any;


  constructor(private dataService: DataService, private weatherService: WeatherService, private forecastService: ForecastService) { }

  ngOnInit() {
    this.dataService.getUserCount().subscribe(count => {
      this.userCount = count;
    });

    this.weatherService.getWeatherData('Berlin').subscribe(data => {
      this.weatherData = data;
      console.log(this.weatherData);
    });

    this.getForecast();

    

/*     this.dataService.getUsersCheckInOut().subscribe(data => {
      this.usersCheckInOut = data;
    }); */
  }

  getTemperatureInCelsius(kelvin: number): number {
    return kelvin - 273.15;
  }

  getForecast(): void {
    const cityId = '2950159'; // Replace with your city ID
    this.forecastService.getFiveDayForecast(cityId).subscribe((data) => {
      this.forecastData = data.list;
    });
  }
  
  
}
