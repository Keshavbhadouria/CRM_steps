import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceActivityCreateEditModalComponent } from './service-activity-create-edit-modal.component';

describe('ServiceActivityCreateEditModalComponent', () => {
  let component: ServiceActivityCreateEditModalComponent;
  let fixture: ComponentFixture<ServiceActivityCreateEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceActivityCreateEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceActivityCreateEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
