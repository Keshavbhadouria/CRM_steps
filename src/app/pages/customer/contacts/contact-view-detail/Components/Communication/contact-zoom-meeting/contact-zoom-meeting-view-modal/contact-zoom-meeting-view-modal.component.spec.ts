import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactZoomMeetingViewModalComponent } from './contact-zoom-meeting-view-modal.component';

describe('ContactZoomMeetingViewModalComponent', () => {
  let component: ContactZoomMeetingViewModalComponent;
  let fixture: ComponentFixture<ContactZoomMeetingViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactZoomMeetingViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactZoomMeetingViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
