import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineCreateEditComponent } from './timeline-create-edit.component';

describe('TimelineCreateEditComponent', () => {
  let component: TimelineCreateEditComponent;
  let fixture: ComponentFixture<TimelineCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelineCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
