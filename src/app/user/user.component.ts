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
  searchText: string = '';
  filteredUsers: any = [];

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
          return { id, ...data };
        });
        this.filteredUsers = [...this.allUsers]; // copy array
        console.log('received changes from debugger', this.allUsers);
      });
  }
  

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  filterUsers() {
    if (!this.searchText) {
      this.filteredUsers = this.allUsers;
    } else {
      this.filteredUsers = this.allUsers.filter((user: any) => {
        return Object.values(user)
          .join(' ')
          .toLowerCase()
          .includes(this.searchText.toLowerCase());
      });
    }
  }

  search() {
    if (!this.searchText) {
      return this.allUsers;
    }
    
    return this.allUsers.filter((user: { firstName: string; lastName: string; }) =>
      user.firstName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.lastName.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  deleteUser(userId: string) {
    this.firestore
      .collection('users')
      .doc(userId)
      .delete()
      .then(() => {
        console.log('User successfully deleted!');
      })
      .catch((error) => {
        console.error('Error removing user: ', error);
      });
  }
  
}
