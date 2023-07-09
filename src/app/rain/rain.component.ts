import { Component, OnInit } from '@angular/core';
import { RainviewerService } from '../rainviewer.service';

@Component({
  selector: 'app-rain',
  templateUrl: './rain.component.html',
  styleUrls: ['./rain.component.scss'],
})
export class RainComponent implements OnInit {
  rainData: any;

  constructor(private rainviewerService: RainviewerService) {}

  ngOnInit(): void {
    this.rainviewerService.getRainData().subscribe((data) => {
      this.rainData = data;
    });
  }
}
