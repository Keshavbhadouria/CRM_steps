import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingCreateEditComponent } from './training-create-edit.component';

describe('TrainingCreateEditComponent', () => {
  let component: TrainingCreateEditComponent;
  let fixture: ComponentFixture<TrainingCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
