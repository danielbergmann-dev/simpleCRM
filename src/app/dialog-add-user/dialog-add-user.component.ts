import { User } from 'src/models/user.class';
import { Component, inject } from '@angular/core';
/* import { Firestore, collection, collectionData } from '@angular/fire/firestore'; */
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';

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

  /*   firestore: any; */

  constructor(
    public dialogRef: MatDialogRef<DialogAddUserComponent>,
    public firestore: AngularFirestore
  ) {
    this.birthDate = new Date();
    this.checkInDate = new Date();
    this.checkOutDate = new Date();
    this.firestore = firestore; // assign the firestore parameter to the firestore property
  }

  saveUser() {
    this.user.checkInDate = this.checkInDate.getTime();
    this.user.checkOutDate = this.checkOutDate.getTime();
    this.user.birthDate = this.birthDate.getTime();
    console.log('Add user finished', this.user);

    this.loading = true;

    this.firestore
      .collection('users')
      .add(this.user.toJSON())
      .then((res: any) => {
        this.loading = false;
        this.dialogRef.close(); // close the dialog
      });
  }
}
