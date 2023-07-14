import { Component, OnInit } from '@angular/core';
import { DeliverySimulationService, Delivery } from '../delivery-simulation.service';
import { TrackingService } from '../tracking.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  delivery: Delivery | any;

  constructor(public deliverySimulationService: DeliverySimulationService, private trackingService: TrackingService) { }

  ngOnInit(): void {
    this.deliverySimulationService.createDelivery(new Date()).subscribe((delivery) => {
      this.delivery = delivery;
    });
  }

}
