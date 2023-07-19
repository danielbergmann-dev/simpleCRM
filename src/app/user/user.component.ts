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
  sortAscending: boolean = true;

  constructor(public dialog: MatDialog, private firestore: AngularFirestore) {}

  ngOnInit() {
    this.firestore
      .collection('users')
      .snapshotChanges()
      .subscribe((changes: any) => {
        this.allUsers = changes.map((change: any) => {
          const data = change.payload.doc.data();
          const id = change.payload.doc.id;
          console.log('data', data);
          return { id, ...data };
        });
        this.filteredUsers = [...this.allUsers]; // copy array
        console.log('received changes from debugger', this.allUsers);
        this.sortUsers();
      });
  }

  toggleSort() {
    this.sortAscending = !this.sortAscending;
    this.sortUsers();
  }

  sortUsers() {
    this.filteredUsers = [...this.allUsers].sort((a: any, b: any) => {
      let nameA = a.firstName.toLowerCase() + a.lastName.toLowerCase();
      let nameB = b.firstName.toLowerCase() + b.lastName.toLowerCase();
      if (this.sortAscending) {
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      } else {
        if (nameA > nameB) return -1;
        if (nameA < nameB) return 1;
        return 0;
      }
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

    return this.allUsers.filter(
      (user: { firstName: string; lastName: string }) =>
        user.firstName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        user.lastName.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
