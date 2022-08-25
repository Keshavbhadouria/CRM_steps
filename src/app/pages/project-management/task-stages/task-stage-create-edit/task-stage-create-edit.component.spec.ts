import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskStageCreateEditComponent } from './task-stage-create-edit.component';

describe('TaskStageCreateEditComponent', () => {
  let component: TaskStageCreateEditComponent;
  let fixture: ComponentFixture<TaskStageCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskStageCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskStageCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
