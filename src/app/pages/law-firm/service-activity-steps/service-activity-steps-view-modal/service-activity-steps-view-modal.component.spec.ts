import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceActivityStepsViewModalComponent } from './service-activity-steps-view-modal.component';

describe('ServiceActivityStepsViewModalComponent', () => {
  let component: ServiceActivityStepsViewModalComponent;
  let fixture: ComponentFixture<ServiceActivityStepsViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceActivityStepsViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceActivityStepsViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
