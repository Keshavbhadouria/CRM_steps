import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneCallHistoryComponent } from './phone-call-history.component';

describe('PhoneCallHistoryComponent', () => {
  let component: PhoneCallHistoryComponent;
  let fixture: ComponentFixture<PhoneCallHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneCallHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneCallHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
