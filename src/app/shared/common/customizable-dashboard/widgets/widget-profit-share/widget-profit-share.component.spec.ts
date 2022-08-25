import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetProfitShareComponent } from './widget-profit-share.component';

describe('WidgetProfitShareComponent', () => {
  let component: WidgetProfitShareComponent;
  let fixture: ComponentFixture<WidgetProfitShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetProfitShareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetProfitShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
