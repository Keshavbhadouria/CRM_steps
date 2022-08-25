import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LMSFormTypeComponent } from './lmsform-type/lmsform-type.component';
import { LMSDisplayTypeComponent } from './lmsdisplay-type/lmsdisplay-type.component';
import { LMSFormRoutingModule } from './lmsform-routing-module';
import { LmsdisplayCreateEditComponent } from './lmsdisplay-type/lmsdisplay-create-edit.component';
import { LmsdisplayViewComponent } from './lmsdisplay-type/lmsdisplay-view.component';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { LmsformTypeCreateEditComponent } from './lmsform-type/lmsform-type-create-edit.component';
import { LmsformTypeViewComponent } from './lmsform-type/lmsform-type-view.component';
import { FormComponent } from './form/form.component';
import { FormCreateComponent } from './form/form-create/form-create.component';
import { QuestionComponent } from './form/form-create/question/question.component';
import { QuestionOptionComponent } from './form/form-create/question/question-option/question-option.component';



@NgModule({
  declarations: [
    LMSFormTypeComponent,
    LMSDisplayTypeComponent,
    LmsdisplayCreateEditComponent,
    LmsdisplayViewComponent,
    LmsformTypeCreateEditComponent,
    LmsformTypeViewComponent,
    FormComponent,
    FormCreateComponent,
    QuestionComponent,
    QuestionOptionComponent
  ],
  imports: [
    CommonModule,
    LMSFormRoutingModule,
    NgbDropdownModule,
    UIModule,
    TranslateModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule,

  ]
})
export class LMSFormModule { }
