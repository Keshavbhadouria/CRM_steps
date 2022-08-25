import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFriquenciesComponent } from './task-friquencies.component';

describe('TaskFriquenciesComponent', () => {
  let component: TaskFriquenciesComponent;
  let fixture: ComponentFixture<TaskFriquenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskFriquenciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFriquenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
