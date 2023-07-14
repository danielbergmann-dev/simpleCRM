import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TrackingService } from '../tracking.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  allUsers: any = [];
  estimatedDeliveryDate!: Date;
  randomOrderDate!: Date;
  deliveryStatus!: string;

  constructor(public dialog: MatDialog, private firestore: AngularFirestore, private trackingService: TrackingService) {}

  /* ngOnInit() {
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((changes: any) => {
        console.log('received changes from debugger', changes);
        this.allUsers = changes;
      });
  } */

  ngOnInit() {
    
    this.firestore
      .collection('users')
      .snapshotChanges()
      .subscribe((changes: any) => {
        this.allUsers = changes.map((change: any) => {
          const data = change.payload.doc.data();
          const id = change.payload.doc.id;
          // Überprüfen, ob birthDate existiert, bevor die Umwandlung durchgeführt wird
          if (data.birthDate) {
            data.birthDate = new Date(data.birthDate.seconds * 1000);
          }
          return { id, ...data };
        });
        console.log('received changes from debugger', this.allUsers);
        
      });
           
  }

  toJSON() {
    return {
      // ...
      randomOrderDate: this.randomOrderDate.getTime(), // Speichern Sie das Datum als Timestamp
      estimatedDeliveryDate: this.estimatedDeliveryDate.getTime(), // Speichern Sie das Datum als Timestamp
      deliveryStatus: this.deliveryStatus,
    };
  }


  simulateAllUsers() {
    this.allUsers.forEach((user: { id: string; }) => {
      this.trackingService.simulateTracking(user.id);
    });
    
  }
  
  
  

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
function simulateAllUsers() {
  throw new Error('Function not implemented.');
}


