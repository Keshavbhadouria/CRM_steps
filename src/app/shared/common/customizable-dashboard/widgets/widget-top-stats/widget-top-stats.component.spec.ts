import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetTopStatsComponent } from './widget-top-stats.component';

describe('WidgetTopStatsComponent', () => {
  let component: WidgetTopStatsComponent;
  let fixture: ComponentFixture<WidgetTopStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetTopStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetTopStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
