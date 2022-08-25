import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDateRangePickerComponent } from './filter-date-range-picker.component';

describe('FilterDateRangePickerComponent', () => {
  let component: FilterDateRangePickerComponent;
  let fixture: ComponentFixture<FilterDateRangePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterDateRangePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDateRangePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
