import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SMSTrackingComponent } from './smstracking.component';

describe('SMSTrackingComponent', () => {
  let component: SMSTrackingComponent;
  let fixture: ComponentFixture<SMSTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SMSTrackingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SMSTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
