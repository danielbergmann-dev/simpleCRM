import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  allUsers: any = [];

  constructor(public dialog: MatDialog, private firestore: AngularFirestore) {}

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
  
  
  

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
