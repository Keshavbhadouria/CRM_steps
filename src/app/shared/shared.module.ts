import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIModule } from './ui/ui.module';

import { WidgetModule } from './widget/widget.module';
import { BusyIfDirective } from '../core/directives/busy-if.directive';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { StyleCellDirective } from '../core/directives/cell-style.directive';
import { TranslateModule } from '@ngx-translate/core';
import { PasswordComplexityValidator } from '../core/directives/password-complexity-validator.directive';

@NgModule({
  declarations: [BusyIfDirective , PasswordComplexityValidator],
  imports: [
    CommonModule,
    UIModule,
    WidgetModule,
    CKEditorModule,
    NgSelectModule,
    TranslateModule
  ],
  exports: [BusyIfDirective, CKEditorModule, NgSelectModule , PasswordComplexityValidator]
})

export class SharedModule { }
