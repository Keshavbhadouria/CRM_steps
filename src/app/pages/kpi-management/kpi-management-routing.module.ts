import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessKpiComponent } from './business-kpi/business-kpi.component';
import { KpiCategoriesComponent } from './kpi-categories/kpi-categories.component';

const routes: Routes = [
  { path: "kpicategories", component: KpiCategoriesComponent },
  { path: "businessKPIs", component: BusinessKpiComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KpiManagementRoutingModule { }
