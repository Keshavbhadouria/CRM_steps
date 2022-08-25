import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, PercentPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbCollapseModule, NgbDatepickerModule, NgbTimepickerModule, NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { PagetitleComponent } from './pagetitle/pagetitle.component';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';
import { StyleCellDirective } from 'src/app/core/directives/cell-style.directive';
import { FormatCellPipe } from 'src/app/core/pipes/formet-cell.pipe';
import { CoreModule } from 'src/app/core/core.module';
import { ValidationMessagesComponent } from './validation-messages.component';
import { SafePipe } from 'src/app/core/pipes/safe.pipe';
import { MomentFormatPipe } from 'src/app/core/pipes/moment-format.pipe';
import { CustomSlice } from 'src/app/core/pipes/custom-slice.pipe';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@NgModule({
  declarations: [
    PagetitleComponent,
    DynamicTableComponent,
    StyleCellDirective, FormatCellPipe, ValidationMessagesComponent, SafePipe,CustomSlice,
    MomentFormatPipe],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    NgbCollapseModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgbDropdownModule,
    NgbPaginationModule,
    BsDropdownModule
  ],
  providers: [
    CurrencyPipe, DatePipe, PercentPipe, SafePipe , CustomSlice
  ],
  exports: [PagetitleComponent, DynamicTableComponent, FormatCellPipe, ValidationMessagesComponent,SafePipe,MomentFormatPipe , CustomSlice, BsDropdownModule]
})
export class UIModule { }
