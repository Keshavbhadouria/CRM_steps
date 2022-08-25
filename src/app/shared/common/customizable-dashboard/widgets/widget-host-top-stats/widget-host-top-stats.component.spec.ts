import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetHostTopStatsComponent } from './widget-host-top-stats.component';

describe('WidgetHostTopStatsComponent', () => {
  let component: WidgetHostTopStatsComponent;
  let fixture: ComponentFixture<WidgetHostTopStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetHostTopStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetHostTopStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
