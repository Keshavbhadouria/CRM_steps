import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPriorityCreateEditComponent } from './task-priority-create-edit.component';

describe('TaskPriorityCreateEditComponent', () => {
  let component: TaskPriorityCreateEditComponent;
  let fixture: ComponentFixture<TaskPriorityCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskPriorityCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskPriorityCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
