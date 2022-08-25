import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskStagesComponent } from './task-stages.component';

describe('TaskStagesComponent', () => {
  let component: TaskStagesComponent;
  let fixture: ComponentFixture<TaskStagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskStagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
