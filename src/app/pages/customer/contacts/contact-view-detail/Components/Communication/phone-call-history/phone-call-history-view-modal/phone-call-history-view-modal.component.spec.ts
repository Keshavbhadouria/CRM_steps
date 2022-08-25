import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneCallHistoryViewModalComponent } from './phone-call-history-view-modal.component';

describe('PhoneCallHistoryViewModalComponent', () => {
  let component: PhoneCallHistoryViewModalComponent;
  let fixture: ComponentFixture<PhoneCallHistoryViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneCallHistoryViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneCallHistoryViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
