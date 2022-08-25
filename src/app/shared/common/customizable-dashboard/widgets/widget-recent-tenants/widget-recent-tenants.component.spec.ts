import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetRecentTenantsComponent } from './widget-recent-tenants.component';

describe('WidgetRecentTenantsComponent', () => {
  let component: WidgetRecentTenantsComponent;
  let fixture: ComponentFixture<WidgetRecentTenantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetRecentTenantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetRecentTenantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
