import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  userId = '';

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.userId = paramMap.get('id') || '';
      console.log('user ID', this.userId);
      
    });
  }
}