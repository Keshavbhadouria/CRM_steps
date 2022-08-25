import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTriggersComponent } from './activity-triggers.component';

describe('ActivityTriggersComponent', () => {
  let component: ActivityTriggersComponent;
  let fixture: ComponentFixture<ActivityTriggersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityTriggersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityTriggersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
