import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffProfileCreateEditComponent } from './staff-profile-create-edit.component';

describe('StaffProfileCreateEditComponent', () => {
  let component: StaffProfileCreateEditComponent;
  let fixture: ComponentFixture<StaffProfileCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffProfileCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffProfileCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
