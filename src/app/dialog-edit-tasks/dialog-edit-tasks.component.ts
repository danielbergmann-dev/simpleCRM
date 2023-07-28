import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-dialog-edit-tasks',
  templateUrl: './dialog-edit-tasks.component.html',
  styleUrls: ['./dialog-edit-tasks.component.scss']
})
export class DialogEditTasksComponent implements OnInit{
  @Input() user!: User;
  userId!: string;
  loading = false;
  checkInDate!: Date;
  checkOutDate!: Date;
  birthDate!: Date;

  constructor(public dialogRef: MatDialogRef<DialogEditTasksComponent>,
    public firestore: AngularFirestore, private router: Router, private route: ActivatedRoute){
  }
  
  ngOnInit() {
    this.checkInDate = this.user.checkInDate ? new Date(this.user.checkInDate) : new Date();
    this.checkOutDate = this.user.checkOutDate ? new Date(this.user.checkOutDate) : new Date();
    this.birthDate = this.user.birthDate ? new Date(this.user.birthDate) : new Date();
  }
  

  saveUser() {
    this.user.checkInDate = this.checkInDate.getTime();
    this.user.checkOutDate = this.checkOutDate.getTime();
    this.user.birthDate = this.birthDate.getTime();
    this.loading = true;

    this.firestore
    .collection('users')
    .doc(this.userId)
    .update(this.user.toJSON())
    this.loading = false;
    this.dialogRef.close();
    this.router.navigate(['/tasks']); 
    
    
    }
}
