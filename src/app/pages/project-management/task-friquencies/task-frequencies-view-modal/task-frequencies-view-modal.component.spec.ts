import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFrequenciesViewModalComponent } from './task-frequencies-view-modal.component';

describe('TaskFrequenciesViewModalComponent', () => {
  let component: TaskFrequenciesViewModalComponent;
  let fixture: ComponentFixture<TaskFrequenciesViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskFrequenciesViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFrequenciesViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
