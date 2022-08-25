import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFriquenciesCreateEditModalComponent } from './task-friquencies-create-edit-modal.component';

describe('TaskFriquenciesCreateEditModalComponent', () => {
  let component: TaskFriquenciesCreateEditModalComponent;
  let fixture: ComponentFixture<TaskFriquenciesCreateEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskFriquenciesCreateEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFriquenciesCreateEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
