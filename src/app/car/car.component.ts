import { Component, OnInit } from '@angular/core';
import { CarService } from '../car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
})
export class CarComponent implements OnInit {
  carData: any;

  constructor(private carService: CarService) {}

  ngOnInit() {}

  getCar(model: string) {
    this.carService.getCarData(model).subscribe({
      next: (data: any) => {
        this.carData = data;
        console.log(data);
      },
    });
  }
}
