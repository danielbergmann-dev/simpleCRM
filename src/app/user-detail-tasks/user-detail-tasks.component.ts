import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditTasksComponent } from '../dialog-edit-tasks/dialog-edit-tasks.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail-tasks',
  templateUrl: './user-detail-tasks.component.html',
  styleUrls: ['./user-detail-tasks.component.scss']
})
export class UserDetailTasksComponent implements OnInit {
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

  editUserDetailTasks() {
    const dialog = this.dialog.open(DialogEditTasksComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

/*   editAdressDetail() {
    const dialog = this.dialog.open(DialogEditAdressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  } */

  deleteUser(userId: string) {
    this.firestore
      .collection('users')
      .doc(this.userId)
      .delete()
      .then(() => {
        console.log('User successfully deleted!');
        this.router.navigate(['/user']);
      })
      .catch((error) => {
        console.error('Error removing user: ', error);
      });
  }
}
