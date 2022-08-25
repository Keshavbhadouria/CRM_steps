import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetSalesSummaryComponent } from './widget-sales-summary.component';

describe('WidgetSalesSummaryComponent', () => {
  let component: WidgetSalesSummaryComponent;
  let fixture: ComponentFixture<WidgetSalesSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetSalesSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetSalesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
