import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetSubscriptionExpiringTenantsComponent } from './widget-subscription-expiring-tenants.component';

describe('WidgetSubscriptionExpiringTenantsComponent', () => {
  let component: WidgetSubscriptionExpiringTenantsComponent;
  let fixture: ComponentFixture<WidgetSubscriptionExpiringTenantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetSubscriptionExpiringTenantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetSubscriptionExpiringTenantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
