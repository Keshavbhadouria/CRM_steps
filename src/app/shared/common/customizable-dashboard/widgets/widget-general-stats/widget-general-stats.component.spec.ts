import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetGeneralStatsComponent } from './widget-general-stats.component';

describe('WidgetGeneralStatsComponent', () => {
  let component: WidgetGeneralStatsComponent;
  let fixture: ComponentFixture<WidgetGeneralStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetGeneralStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetGeneralStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
