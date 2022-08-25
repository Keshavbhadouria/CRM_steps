import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalHistoryConditionCreateEditComponent } from './medical-history-condition-create-edit.component';

describe('MedicalHistoryConditionCreateEditComponent', () => {
  let component: MedicalHistoryConditionCreateEditComponent;
  let fixture: ComponentFixture<MedicalHistoryConditionCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalHistoryConditionCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalHistoryConditionCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
