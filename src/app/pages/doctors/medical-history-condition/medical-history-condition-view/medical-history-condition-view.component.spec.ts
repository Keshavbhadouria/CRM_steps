import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalHistoryConditionViewComponent } from './medical-history-condition-view.component';

describe('MedicalHistoryConditionViewComponent', () => {
  let component: MedicalHistoryConditionViewComponent;
  let fixture: ComponentFixture<MedicalHistoryConditionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalHistoryConditionViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalHistoryConditionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
