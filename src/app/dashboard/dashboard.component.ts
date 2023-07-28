import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';





@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userCount!: number;
  usersCheckInOut!: any;
  


  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getUserCount().subscribe(count => {
      this.userCount = count;
    });

    

    

/*     this.dataService.getUsersCheckInOut().subscribe(data => {
      this.usersCheckInOut = data;
    }); */
  }

  
  
  
}
