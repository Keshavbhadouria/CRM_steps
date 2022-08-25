import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskVelocityCreateEditComponent } from './task-velocity-create-edit.component';

describe('TaskVelocityCreateEditComponent', () => {
  let component: TaskVelocityCreateEditComponent;
  let fixture: ComponentFixture<TaskVelocityCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskVelocityCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskVelocityCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
