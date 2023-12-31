import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAdressComponent } from '../dialog-edit-adress/dialog-edit-adress.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  userId = '';
  user!: User;

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public dialog: MatDialog
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
        // Überprüfen, ob birthDate existiert, bevor die Umwandlung durchgeführt wird
        if (user.birthDate) {
          user.birthDate = new Date(user.birthDate.seconds * 1000);
        }
        this.user = new User(user);
      });
  }
  
  

  editUserDetail() {
    const dialog =  this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User (this.user.toJSON());
dialog.componentInstance.userId = this.userId;
  }

  editAdressDetail() {
   const dialog = this.dialog.open(DialogEditAdressComponent);
   dialog.componentInstance.user = new User (this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }
}
