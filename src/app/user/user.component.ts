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

  ngOnInit() {
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((changes: any) => {
        console.log('received changes from debugger', changes);
        this.allUsers = changes;
      });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
