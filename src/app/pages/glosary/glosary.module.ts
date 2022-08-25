import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { glosaryRoutingModule } from './glosary-routing.module';
import { GlosaryTermsComponent } from './glosary-terms/glosary-terms.component';
import { GlosaryTermsViewComponent } from './glosary-terms/glosary-terms-view/glosary-terms-view.component';
import { GlosaryTermsCreateEditComponent } from './glosary-terms/glosary-terms-create-edit/glosary-terms-create-edit.component';



@NgModule({
  declarations: [
    GlosaryTermsComponent,
    GlosaryTermsViewComponent,
    GlosaryTermsCreateEditComponent
  ],
  imports: [
    CommonModule,
    glosaryRoutingModule,
    UIModule,
    NgbDropdownModule,
    TranslateModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule
  ]
})
export class GlosaryModule { }
