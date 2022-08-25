import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskVelocityComponent } from './task-velocity.component';

describe('TaskVelocityComponent', () => {
  let component: TaskVelocityComponent;
  let fixture: ComponentFixture<TaskVelocityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskVelocityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskVelocityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
