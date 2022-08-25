import { Component, OnInit } from '@angular/core';

declare let abp: any;
@Component({
  selector: 'app-filter-date-range-picker',
  templateUrl: './filter-date-range-picker.component.html',
  styleUrls: ['./filter-date-range-picker.component.scss']
})
export class FilterDateRangePickerComponent implements OnInit {

  minStartDateFilter: Date;
  maxStartDateFilter: Date;

  currDate = new Date();

  constructor() { }

  ngOnInit(): void {
    let minDate = new Date();
    minDate.setDate(this.currDate.getDate() - 7);
    this.minStartDateFilter = minDate;
    this.maxStartDateFilter = this.currDate;

    abp.event.trigger('app.dashboardFilters.updateDates', {
      start: this.minStartDateFilter,
      end: this.maxStartDateFilter
    });
  }

  onChange() {

    abp.event.trigger('app.dashboardFilters.dateRangePicker.onDateChange', [this.minStartDateFilter, this.maxStartDateFilter]);
  }

  startChange(date) {
    
    this.minStartDateFilter = date;
    abp.event.trigger('app.dashboardFilters.updateDates', {
      start: this.minStartDateFilter,
      end: this.maxStartDateFilter
    });
  }
  endChange(date) {
    
    this.maxStartDateFilter = date;
    abp.event.trigger('app.dashboardFilters.updateDates', {
      start: this.minStartDateFilter,
      end: this.maxStartDateFilter
    });
  }
}
