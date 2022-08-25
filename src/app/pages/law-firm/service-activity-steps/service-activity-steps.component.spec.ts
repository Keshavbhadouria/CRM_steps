import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceActivityStepsComponent } from './service-activity-steps.component';

describe('ServiceActivityStepsComponent', () => {
  let component: ServiceActivityStepsComponent;
  let fixture: ComponentFixture<ServiceActivityStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceActivityStepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceActivityStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
