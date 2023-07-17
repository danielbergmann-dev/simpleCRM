import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  allUsers: any = [];
  userId: string = '';
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
  


    

  constructor(public dialog: MatDialog, private firestore: AngularFirestore, private userService: UserService) {}

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
        console.log('User objects: ', this.allUsers);

      });

    this.createUser();

    this.userService.getUsers().subscribe((users: any[]) => {
      this.allUsers = users;
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

    return this.allUsers.filter(
      (user: { firstName: string; lastName: string }) =>
        user.firstName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        user.lastName.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

    getRandomElement(array: string[]) {
    return array[Math.floor(Math.random() * array.length)];
  }

  createUser() {
    // Überprüfen Sie, ob bereits Nutzer vorhanden sind.
    if (this.allUsers.length > 0) {
      console.log('Users already exist. No new users created.');
      return;
    }
  
    for (let i = 0; i < 5; i++) {
      let firstName = this.getRandomElement(this.firstNames);
      let lastName = this.getRandomElement(this.lastNames);
  
      // Überprüfen Sie, ob ein Benutzer mit demselben Namen bereits existiert.
      let duplicateUser = this.allUsers.find((user: { firstName: string; lastName: string; }) => user.firstName === firstName && user.lastName === lastName);
  
      // Wenn ein Duplikat gefunden wird, generieren Sie einen neuen Namen.
      while (duplicateUser) {
        console.log('User with the same name already exists. Generating a new name.');
        firstName = this.getRandomElement(this.firstNames);
        lastName = this.getRandomElement(this.lastNames);
        duplicateUser = this.allUsers.find((user: { firstName: string; lastName: string; }) => user.firstName === firstName && user.lastName === lastName);
      }
  
      const departureDate = new Date();
      departureDate.setHours(departureDate.getHours() + 2*23*12 + Math.floor(Math.random() * 3)); // Add 2 to 4 hours
      const arrivalDate = new Date(departureDate.getTime());
      arrivalDate.setHours(arrivalDate.getHours() + 10*34*13 + Math.floor(Math.random() * 3)); // Add 10 to 12 hours
  
      const user = {
        firstName: firstName,
        lastName: lastName,
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

  deleteUser(userId: string) {
    this.firestore
      .collection('users')
      .doc(userId)
      .delete()
      .then(() => {
        console.log('Deleting user with ID: ', userId);
        // Aktualisieren Sie die Benutzerliste nach dem Löschen
        this.allUsers = this.allUsers.filter((user: any) => user.id !== userId);
        this.filteredUsers = this.filteredUsers.filter((user: any) => user.id !== userId);
      })
      .catch((error) => {
        console.error('Error removing user: ', error);
      });
  }
  
  
  
  
}
