import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class TrackingService {
  constructor(private firestore: AngularFirestore) {}

  simulateTracking(id: string) {
    // Simuliere den Wechsel des Lieferstatus.
    const statuses = [
      { status: 'bestellt', color: 'orange' },
      { status: 'versandt', color: 'blue' },
      { status: 'unterwegs', color: 'yellow' },
      { status: 'geliefert', color: 'green' },
    ];

    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    // Simuliere das Bestelldatum.
    const randomOrderDate = new Date();
    randomOrderDate.setDate(
      randomOrderDate.getDate() - Math.floor(Math.random() * 14)
    ); // setzt das Datum auf 0 bis 14 Tage in die Vergangenheit

    // Simuliere das voraussichtliche Lieferdatum.
    const randomDeliveryDate = new Date();
    randomDeliveryDate.setDate(
      randomDeliveryDate.getDate() + Math.floor(Math.random() * 10)
    ); // setzt das Datum auf 0 bis 14 Tage in der Zukunft

    this.firestore.collection('users').doc(id).update({
      deliveryStatus: randomStatus,
      randomOrderDate: randomOrderDate,
      estimatedDeliveryDate: randomDeliveryDate,
      deliveryStatusColor: randomStatus.color,
    });
  }
}
