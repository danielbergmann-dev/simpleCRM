import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Delivery {
  id: string;
  startLocation: string;
  endLocation: string;
  status: 'picked up' | 'in transit' | 'delivered';
  estimatedDeliveryDate: Date;
}

@Injectable({
  providedIn: 'root',
})
export class DeliverySimulationService {
  deliveries: Delivery[] = [];
  locations: string[] = ['Deutschland', 'Frankreich', 'Spanien', 'Italien', 'Niederlande', 'Belgien', 'Polen', 'Dänemark', 'Schweden', 'Norwegen']; // add more locations as needed

  constructor() {}

  createDelivery(estimatedDeliveryDate: Date): Observable<Delivery> {
    const startLocation = this.randomLocation();
    const endLocation = this.randomLocation();
    const delivery: Delivery = {
      id: this.generateId(),
      startLocation,
      endLocation,
      status: 'picked up',
      estimatedDeliveryDate,
    };

    this.deliveries.push(delivery);
    this.simulateDelivery(delivery);

    return of(delivery);
  }

  private randomLocation(): string {
    const randomIndex = Math.floor(Math.random() * this.locations.length);
    return this.locations[randomIndex];
  }

  private simulateDelivery(delivery: Delivery) {
   
    // setTimeout to change the status after a random interval
    setTimeout(() => {
      delivery.status = 'in transit';
    }, 1000);
  }

  private generateId(): string {
    // generate a unique id for each delivery
    return Math.random().toString(6).substring(2, 5) + Math.random().toString(6).substring(2, 5);
  }
}
