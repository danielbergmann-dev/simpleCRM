import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailTasksComponent } from './user-detail-tasks.component';

describe('UserDetailTasksComponent', () => {
  let component: UserDetailTasksComponent;
  let fixture: ComponentFixture<UserDetailTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDetailTasksComponent]
    });
    fixture = TestBed.createComponent(UserDetailTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
