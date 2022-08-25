import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffProfileViewComponent } from './staff-profile-view.component';

describe('StaffProfileViewComponent', () => {
  let component: StaffProfileViewComponent;
  let fixture: ComponentFixture<StaffProfileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffProfileViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
