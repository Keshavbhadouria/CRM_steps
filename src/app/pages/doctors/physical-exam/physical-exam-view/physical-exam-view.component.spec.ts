import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalExamViewComponent } from './physical-exam-view.component';

describe('PhysicalExamViewComponent', () => {
  let component: PhysicalExamViewComponent;
  let fixture: ComponentFixture<PhysicalExamViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicalExamViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalExamViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
