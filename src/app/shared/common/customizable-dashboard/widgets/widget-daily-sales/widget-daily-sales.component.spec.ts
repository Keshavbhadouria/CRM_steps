import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetDailySalesComponent } from './widget-daily-sales.component';

describe('WidgetDailySalesComponent', () => {
  let component: WidgetDailySalesComponent;
  let fixture: ComponentFixture<WidgetDailySalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetDailySalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetDailySalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
