import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetIncomeStatisticsComponent } from './widget-income-statistics.component';

describe('WidgetIncomeStatisticsComponent', () => {
  let component: WidgetIncomeStatisticsComponent;
  let fixture: ComponentFixture<WidgetIncomeStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetIncomeStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetIncomeStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
