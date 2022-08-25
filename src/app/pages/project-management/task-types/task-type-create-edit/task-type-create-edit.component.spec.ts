import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTypeCreateEditComponent } from './task-type-create-edit.component';

describe('TaskTypeCreateEditComponent', () => {
  let component: TaskTypeCreateEditComponent;
  let fixture: ComponentFixture<TaskTypeCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskTypeCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTypeCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
