import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskVelocityViewComponent } from './task-velocity-view.component';

describe('TaskVelocityViewComponent', () => {
  let component: TaskVelocityViewComponent;
  let fixture: ComponentFixture<TaskVelocityViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskVelocityViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskVelocityViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
