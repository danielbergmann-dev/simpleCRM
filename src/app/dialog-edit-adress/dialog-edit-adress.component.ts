import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-adress',
  templateUrl: './dialog-edit-adress.component.html',
  styleUrls: ['./dialog-edit-adress.component.scss'],
})
export class DialogEditAdressComponent {
  user!: User;
  userId!: string;

  constructor(
    public dialogRef: MatDialogRef<DialogEditAdressComponent>,
    public firestore: AngularFirestore
  ) {}

  saveUser() {
    this.firestore
      .collection('users')
      .doc(this.userId)
      .update(this.user.toJSON());
      this.dialogRef.close()lack;
}
}
