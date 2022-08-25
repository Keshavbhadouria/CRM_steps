import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalHistoryDiseasesCreateEditComponent } from './medical-history-diseases-create-edit.component';

describe('MedicalHistoryDiseasesCreateEditComponent', () => {
  let component: MedicalHistoryDiseasesCreateEditComponent;
  let fixture: ComponentFixture<MedicalHistoryDiseasesCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalHistoryDiseasesCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalHistoryDiseasesCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
