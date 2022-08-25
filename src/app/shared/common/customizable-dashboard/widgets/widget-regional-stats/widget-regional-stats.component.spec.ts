import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetRegionalStatsComponent } from './widget-regional-stats.component';

describe('WidgetRegionalStatsComponent', () => {
  let component: WidgetRegionalStatsComponent;
  let fixture: ComponentFixture<WidgetRegionalStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetRegionalStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetRegionalStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
