import { Injectable } from '@angular/core';
import { TrackingService } from './tracking.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  allUsers: any = [];

  constructor(
    private firestore: AngularFirestore, 
    private trackingService: TrackingService
  ) {}

  simulateAllUsers() {
    this.firestore
      .collection('users')
      .snapshotChanges()
      .subscribe((changes: any) => {
        this.allUsers = changes.map((change: any) => {
          const data = change.payload.doc.data();
          const id = change.payload.doc.id;
          if (data.birthDate) {
            data.birthDate = new Date(data.birthDate.seconds * 1000);
          }
          return { id, ...data };
        });
        this.allUsers.forEach((user: { id: string; }) => {
          this.trackingService.simulateTracking(user.id);
        });
    });
  }
}
