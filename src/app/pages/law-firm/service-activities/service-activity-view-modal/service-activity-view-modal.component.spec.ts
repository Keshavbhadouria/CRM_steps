import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceActivityViewModalComponent } from './service-activity-view-modal.component';

describe('ServiceActivityViewModalComponent', () => {
  let component: ServiceActivityViewModalComponent;
  let fixture: ComponentFixture<ServiceActivityViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceActivityViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceActivityViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
