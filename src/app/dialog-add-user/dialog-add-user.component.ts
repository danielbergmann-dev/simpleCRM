import { User } from 'src/models/user.class';
import { Component, inject } from '@angular/core';
/* import { Firestore, collection, collectionData } from '@angular/fire/firestore'; */
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
})
export class DialogAddUserComponent {
  /*   firestore: Firestore = inject(Firestore); */
  user = new User();
  birthDate: Date;
  loading = false;

  firestore: any;

  constructor(firestore: AngularFirestore) {
    this.firestore = firestore;
    this.birthDate = new Date();
  }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('Add user finished', this.user);

    this.loading = true;

    this.firestore
      .collection('users')
      .add(this.user.toJSON())
      .then((res: any) => {
        this.loading = false;
        console.log(res);
      });
  }
}
