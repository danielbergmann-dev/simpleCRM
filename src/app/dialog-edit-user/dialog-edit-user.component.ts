import { Component, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {
  @Input() user!: User;
  userId!: string;
  loading = false;
  checkInDate: Date;
  checkOutDate: Date;
  birthDate: Date;

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>,
    public firestore: AngularFirestore){
    this.birthDate = new Date();
    this.checkInDate = new Date();
    this.checkOutDate = new Date();
  }

  saveUser() {
    this.user.checkInDate = this.checkInDate.getTime();
    this.user.checkOutDate = this.checkOutDate.getTime();
    this.user.birthDate = this.birthDate.getTime();
    this.loading = true;

    this.firestore
    .collection('users')
    .doc(this.userId)
    .update(this.user.toJSON())
    this.loading = false;
    this.dialogRef.close();
    
    }
}
