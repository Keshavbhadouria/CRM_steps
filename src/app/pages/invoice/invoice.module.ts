import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceTemplateComponent } from './invoice-template/invoice-template.component';
import { InvoiceTemplateCreateEditComponent } from './invoice-template/invoice-template-create-edit/invoice-template-create-edit.component';
import { InvoiceTemplateViewComponent } from './invoice-template/invoice-template-view/invoice-template-view.component';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { LightboxModule } from 'ngx-lightbox';


@NgModule({
  declarations: [
    InvoiceTemplateComponent,
    InvoiceTemplateCreateEditComponent,
    InvoiceTemplateViewComponent
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    NgbDropdownModule,
    UIModule,
    TranslateModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule,
    LightboxModule
  ]
})
export class InvoiceModule { }
