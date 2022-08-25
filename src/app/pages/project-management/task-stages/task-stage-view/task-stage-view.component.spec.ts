import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskStageViewComponent } from './task-stage-view.component';

describe('TaskStageViewComponent', () => {
  let component: TaskStageViewComponent;
  let fixture: ComponentFixture<TaskStageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskStageViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskStageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
