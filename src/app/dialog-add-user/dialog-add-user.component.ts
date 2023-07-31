import { User } from 'src/models/user.class';
import { Component, inject } from '@angular/core';
/* import { Firestore, collection, collectionData } from '@angular/fire/firestore'; */
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
})
export class DialogAddUserComponent {
  /*   firestore: Firestore = inject(Firestore); */
  user = new User();
  birthDate: Date;
  checkInDate: Date;
  checkOutDate: Date;
  loading = false;
  availableRooms: Observable<any[]>;

  /*   firestore: any; */

  constructor(
    public dialogRef: MatDialogRef<DialogAddUserComponent>,
    public firestore: AngularFirestore
  ) {
    this.birthDate = new Date();
    this.checkInDate = new Date();
    this.checkOutDate = new Date();
    this.firestore = firestore; // assign the firestore parameter to the firestore property
    // Get the available rooms from Firestore
    this.availableRooms = this.firestore.collection('rooms', ref => ref.where('available', '==', true)).valueChanges();
  }

  saveUser() {
    console.log('room Number', this.user.roomNumber)
    this.user.checkInDate = this.checkInDate.getTime();
    this.user.checkOutDate = this.checkOutDate.getTime();
    this.user.birthDate = this.birthDate.getTime();
    console.log('Add user finished', this.user);
  
    this.loading = true;
  
    // Add the user to the 'users' collection
    this.firestore
      .collection('users')
      .add(this.user.toJSON())
      .then((res: any) => {
        // After the user is added, mark the selected room as not available
        return this.firestore.collection('rooms').doc(this.user.roomNumber.toString()).update({
          available: false
        });
      })
      .then(() => {
        this.loading = false;
        this.dialogRef.close(); // close the dialog
      })
      .catch((error) => {
        console.error('Error adding user or updating room: ', error);
        this.loading = false;
      });
  }
  
}
