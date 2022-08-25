import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTriggersCreateEditComponent } from './activity-triggers-create-edit.component';

describe('ActivityTriggersCreateEditComponent', () => {
  let component: ActivityTriggersCreateEditComponent;
  let fixture: ComponentFixture<ActivityTriggersCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityTriggersCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityTriggersCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
