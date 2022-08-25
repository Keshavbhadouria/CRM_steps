import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ColumnSetting, ButtonSettings, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit {
  /* Here we are expecting 4 inputs:
   * title: which represents the tables title
   * records: which represents the table data
   * settings: which represents configuration of each cell // Optional
   * buttons: which represents button configurations  // Optional
   *
   * The interface for the ColumnSetting and ButtonSettings are shown in the
   * model.ts file.

   * In the ngOnInit method we check if a buttons input is passed and then
   * initialize it as an empty array if undefined. We perform the same check on
   * the settings input, if its undefined we generate a default settings
   * configuration.
   *
   */

  @Input() title: any[]; // Table Title
  @Input() records: any[]; // Table Data
  @Input() settings: ColumnSetting[]; // Table Configuration Settings
  @Input() buttons: ButtonSettings[]; // Button Settings - Optional
  @Input() pagination: PaginationSettings;

   // total number of records
   totalRecords = 0;

   // start and end index
   startIndex = 1;
   endIndex = 10;

  columnMaps: ColumnSetting[]; // Placeholder for storing table configuraion settings
  apiUrl: string = environment.apiURL;
  buttonHeader: string; // Button <th> text
  translate : TranslateService
  constructor(public modalService: NgbModal, private _translate : TranslateService) {
    this.translate = _translate;
   }

  ngOnInit(): void {
    if (!this.buttons) this.buttons = [];

    // Determine buttton header text
    this.buttons.length > 1
      ? (this.buttonHeader = 'Actions')
      : (this.buttonHeader = 'Action');

    if (this.settings) {
      // If settings are provided
      this.columnMaps = this.settings;
    } else {
      // If settings are not provided, format headers
      this.columnMaps = Object.keys(this.records[0]).map((key) => {
        return {
          primaryKey: key,
          header:
            key.slice(0, 1).toUpperCase() + key.replace(/_/g, ' ').slice(1),
          format: 0,
        };
      });
    }
  }

  checkIsChildObject(str) {
    if (str.includes('.')) {
      return true;
    } else {
      return false;
    }
  }

  getObj(str) {
    return str.split('.')[0];
  }


  getField(str) {
    return str.split('.')[1];
  }

  // Action button click method
  bC(record, func, values) {
    // func(...values.map((val) => record[val]));
    func(values);
  }

  isBoolean(value) {
    if (typeof value == "boolean") {
      return true;
    }
  }

  openLinkInNewTab(url) {
    if (url.includes('https')) {
      window.open(url);
    }
    else {
      window.open(this.apiUrl + '/' + url);
    }
  }

  onPageChange(page: any): void {
    this.pagination.setPageIndexNgb(page - 1)
    this.startIndex = (page - 1) * this.pagination.pageSize + 1;
    this.endIndex = (page - 1) * this.pagination.pageSize + this.pagination.pageSize;
    if (this.endIndex > this.pagination.totalCount) {
      this.endIndex = this.pagination.totalCount;
    }
  }

  // setPIndex(index) {
  //   this.setPageIndex(index);
  // }


}
