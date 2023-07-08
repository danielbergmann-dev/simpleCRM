import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektPaketeComponent } from './projekt-pakete.component';

describe('ProjektPaketeComponent', () => {
  let component: ProjektPaketeComponent;
  let fixture: ComponentFixture<ProjektPaketeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjektPaketeComponent]
    });
    fixture = TestBed.createComponent(ProjektPaketeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
