import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingAvailabilityComponent } from './meeting-availability.component';

describe('MeetingAvailabilityComponent', () => {
  let component: MeetingAvailabilityComponent;
  let fixture: ComponentFixture<MeetingAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingAvailabilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
