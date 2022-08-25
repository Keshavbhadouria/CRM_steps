import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalHistoryDiseasesComponent } from './medical-history-diseases.component';

describe('MedicalHistoryDiseasesComponent', () => {
  let component: MedicalHistoryDiseasesComponent;
  let fixture: ComponentFixture<MedicalHistoryDiseasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalHistoryDiseasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalHistoryDiseasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
