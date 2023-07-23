import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: AngularFirestore) { }

  getUserCount() {
    return this.firestore.collection('users').valueChanges().pipe(
      map(users => users.length)
    );
}

/* getUsersCheckInOut() {
  return this.firestore.collection('users').valueChanges();
} */

}
