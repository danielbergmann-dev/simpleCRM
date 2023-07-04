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

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>,
    public firestore: AngularFirestore){}

  saveUser() {
    this.firestore
    .collection('users')
    .doc(this.userId)
    .update(this.user.toJSON())
    this.dialogRef.close();
    
    }
}
