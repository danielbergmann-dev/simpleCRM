import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAdressComponent } from '../dialog-edit-adress/dialog-edit-adress.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  userId = '';
  user!: User;
  allUsers: any = [];

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.userId = paramMap.get('id') || '';
      console.log('user ID', this.userId);
      this.getUser();
    });
  }

  getUser() {
    this.firestore
      .collection('users')
      .doc(this.userId)
      .valueChanges()
      .subscribe((user: any) => {
        console.log('user', user);
        this.user = new User(user);
      });
  }

  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

/*   editAdressDetail() {
    const dialog = this.dialog.open(DialogEditAdressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  } */

  deleteUser(userId: string) {
    // Store the room number before deleting the user
  const roomNumber = this.user.roomNumber;

    this.firestore
      .collection('users')
      .doc(this.userId)
      .delete()
      .then(() => {
        // After deleting the user, mark the room as available
        return this.firestore.collection('rooms').doc(roomNumber).update({
          available: true
        });
      })
      .then(() => {
        console.log('User successfully deleted!');
        this.router.navigate(['/user']);
      })
      .catch((error) => {
        console.error('Error removing user: ', error);
      });
  }
}
