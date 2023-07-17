import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  flightStatuses: { [key: string]: number } = {};

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((users: any[]) => {
      users.forEach(user => {
        if (!this.flightStatuses[user.flightStatus]) {
          this.flightStatuses[user.flightStatus] = 1;
        } else {
          this.flightStatuses[user.flightStatus]++;
        }
      });
    });
  }
}

