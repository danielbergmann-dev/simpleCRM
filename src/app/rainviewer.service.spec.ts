import { TestBed } from '@angular/core/testing';

import { RainviewerService } from './rainviewer.service';

describe('RainviewerService', () => {
  let service: RainviewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RainviewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
