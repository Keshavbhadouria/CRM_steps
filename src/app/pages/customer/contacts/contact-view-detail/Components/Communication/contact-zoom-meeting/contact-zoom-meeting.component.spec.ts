import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactZoomMeetingComponent } from './contact-zoom-meeting.component';

describe('ContactZoomMeetingComponent', () => {
  let component: ContactZoomMeetingComponent;
  let fixture: ComponentFixture<ContactZoomMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactZoomMeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactZoomMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
