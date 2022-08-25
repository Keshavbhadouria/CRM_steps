import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetRemaingDaysComponent } from './widget-remaing-days.component';

describe('WidgetRemaingDaysComponent', () => {
  let component: WidgetRemaingDaysComponent;
  let fixture: ComponentFixture<WidgetRemaingDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetRemaingDaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetRemaingDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
