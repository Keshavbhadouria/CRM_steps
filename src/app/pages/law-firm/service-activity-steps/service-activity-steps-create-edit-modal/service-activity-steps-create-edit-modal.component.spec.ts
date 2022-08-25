import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceActivityStepsCreateEditModalComponent } from './service-activity-steps-create-edit-modal.component';

describe('ServiceActivityStepsCreateEditModalComponent', () => {
  let component: ServiceActivityStepsCreateEditModalComponent;
  let fixture: ComponentFixture<ServiceActivityStepsCreateEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceActivityStepsCreateEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceActivityStepsCreateEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
