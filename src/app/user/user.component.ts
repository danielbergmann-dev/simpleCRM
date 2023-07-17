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
  firstNames = [
    'John', 'Jane', 'Chris', 'Alex', 'Kim', 'Sam', 'Lisa', 'Adam', 'Nina', 
    'Daniel', 'Tom', 'Susan', 'Jerry', 'Kate', 'Peter', 'Linda', 'Robert', 
    'Patricia', 'David', 'Jennifer', 'Michael', 'Linda', 'William', 'Emily',
    'James', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen'
  ];
  lastNames = [
    'Doe', 'Smith', 'Johnson', 'Lee', 'Brown', 'Davis', 'Miller', 'Wilson', 
    'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 
    'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson', 'Clark', 'Rodriguez', 
    'Lewis', 'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King', 'Wright'
  ];
  flightDestinations = [
    'New York', 'London', 'Paris', 'Berlin', 'Tokyo', 'Moscow', 'Madrid', 
    'Rome', 'Dublin', 'Sydney', 'Beijing', 'Istanbul', 'Cairo', 'Rio de Janeiro', 
    'Buenos Aires', 'Mexico City', 'Toronto', 'Johannesburg', 'Bangkok', 
    'Seoul', 'Singapore', 'Dubai', 'Athens', 'Lisbon', 'New Delhi', 'Copenhagen', 
    'Helsinki', 'Oslo', 'Stockholm', 'Brussels'
  ];
  
  flightStatuses = ['on time', 'cancelled', 'boarding', 'landed'];

  flightStatusColors: { [key: string]: string } = {
    'on time': 'lightblue',
    'cancelled': 'red',
    'boarding': 'yellow',
    'landed': 'green',
  };
  


    

  constructor(public dialog: MatDialog, private firestore: AngularFirestore) {}

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

    this.createUser();
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

  getRandomElement(array: string[]) {
    return array[Math.floor(Math.random() * array.length)];
  }

  createUser() {
    for (let i = 0; i < 15; i++) {
      const departureDate = new Date();
      const arrivalDate = new Date(departureDate.getTime() + 12 * 60 * 60 * 1000); // Add 12 hours
      const user = {
        firstName: this.getRandomElement(this.firstNames),
        lastName: this.getRandomElement(this.lastNames),
        flightNumber: `FL${Math.floor(Math.random() * 10000)}`, // Generieren Sie eine zufällige Flugnummer
        departureTime: departureDate.toLocaleTimeString('de-DE', { hour12: false }), // Generate a random departure time
        arrivalTime: arrivalDate.toLocaleTimeString('de-DE', { hour12: false }), // Generate a random arrival time
        flightDestination: this.getRandomElement(this.flightDestinations), // Generieren Sie ein zufälliges Ziel
        flightStatus: this.getRandomElement(this.flightStatuses),
        // Sie könnten hier auch die anderen Felder initialisieren
      };
      this.firestore
        .collection('users')
        .add(user)
        .then(() => {
          console.log('User successfully created!');
        })
        .catch((error) => {
          console.error('Error creating user: ', error);
        });
    }
  }
}
