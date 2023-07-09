import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WetterComponent } from './wetter.component';

describe('WetterComponent', () => {
  let component: WetterComponent;
  let fixture: ComponentFixture<WetterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WetterComponent]
    });
    fixture = TestBed.createComponent(WetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
