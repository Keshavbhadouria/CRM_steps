import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTriggersViewComponent } from './activity-triggers-view.component';

describe('ActivityTriggersViewComponent', () => {
  let component: ActivityTriggersViewComponent;
  let fixture: ComponentFixture<ActivityTriggersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityTriggersViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityTriggersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
