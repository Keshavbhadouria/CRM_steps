import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalExamCreateEditComponent } from './physical-exam-create-edit.component';

describe('PhysicalExamCreateEditComponent', () => {
  let component: PhysicalExamCreateEditComponent;
  let fixture: ComponentFixture<PhysicalExamCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicalExamCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalExamCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
