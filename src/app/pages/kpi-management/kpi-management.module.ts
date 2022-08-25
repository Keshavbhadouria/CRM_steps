import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KpiManagementRoutingModule } from './kpi-management-routing.module';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { KpiCategoriesComponent } from './kpi-categories/kpi-categories.component';
import { CreateOrEditKpiCategoryModalComponent } from './kpi-categories/create-or-edit-kpi-category-modal/create-or-edit-kpi-category-modal.component';
import { ViewKpiCategoryModalComponent } from './kpi-categories/view-kpi-category-modal/view-kpi-category-modal.component';
import { BusinessKpiComponent } from './business-kpi/business-kpi.component';
import { CreateOrEditBusinessKpiModalComponent } from './business-kpi/create-or-edit-business-kpi-modal/create-or-edit-business-kpi-modal.component';
import { ViewBusinessKpiModalComponent } from './business-kpi/view-business-kpi-modal/view-business-kpi-modal.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    KpiCategoriesComponent,
    CreateOrEditKpiCategoryModalComponent,
    ViewKpiCategoryModalComponent,
    
    BusinessKpiComponent,
    CreateOrEditBusinessKpiModalComponent,
    ViewBusinessKpiModalComponent
  ],
  imports: [
    CommonModule,
    KpiManagementRoutingModule,
    TableModule,
    //minimun requirement
    NgbDropdownModule,
    UIModule,
    TranslateModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule,
    PaginatorModule,
    DragDropModule
  ]
})
export class KpiManagementModule { }
