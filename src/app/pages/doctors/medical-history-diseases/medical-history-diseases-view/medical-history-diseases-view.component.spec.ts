import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalHistoryDiseasesViewComponent } from './medical-history-diseases-view.component';

describe('MedicalHistoryDiseasesViewComponent', () => {
  let component: MedicalHistoryDiseasesViewComponent;
  let fixture: ComponentFixture<MedicalHistoryDiseasesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalHistoryDiseasesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalHistoryDiseasesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
