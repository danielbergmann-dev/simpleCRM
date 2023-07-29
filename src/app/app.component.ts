import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit{
  title = 'simple-crm';
  isLoggedIn!: boolean;
  private subscription!: Subscription;

  constructor(public translate: TranslateService, private authService: AuthService) {
  
}

ngOnInit() {
  this.subscription = this.authService.isLoggedIn.subscribe(
    (loggedIn) => {
      this.isLoggedIn = loggedIn;  // Update login status
    }
  );
}

ngOnDestroy() {
  this.subscription.unsubscribe();  // Unsubscribe when the component is destroyed
}
}
