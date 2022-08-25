import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTypeViewComponent } from './task-type-view.component';

describe('TaskTypeViewComponent', () => {
  let component: TaskTypeViewComponent;
  let fixture: ComponentFixture<TaskTypeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskTypeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTypeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
