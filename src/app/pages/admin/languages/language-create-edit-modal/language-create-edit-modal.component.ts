import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/api';
import { ApplicationLanguageEditDto, CreateOrUpdateLanguageInput } from 'src/app/core/models/Admin/Language';
import { LanguageService } from 'src/app/core/services/language.service';
import { MessageService } from 'src/app/core/services/message.service';
import { RoleEditDto, RolesService, CreateOrUpdateRoleInput } from 'src/app/core/services/roles.service';
import { PermissionTreeComponent } from '../../users/permission-tree/permission-tree.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-language-create-edit-modal',
  templateUrl: './language-create-edit-modal.component.html',
  styleUrls: ['./language-create-edit-modal.component.scss']
})
export class LanguageCreateEditModalComponent implements OnInit {

  @Input() languageId: number | undefined;
  @Output() $modalClose = new EventEmitter();

  @ViewChild('permissionTree') permissionTree: PermissionTreeComponent;

  loading = false;
  createLoader = false;

  role: RoleEditDto = new RoleEditDto();

  language: ApplicationLanguageEditDto = new ApplicationLanguageEditDto();
  languageNamesSelectItems: SelectItem[] = [];
  flagsSelectItems: SelectItem[] = [];

  constructor(private _roleService: RolesService,
    private _languageService: LanguageService,
    private _translate: TranslateService,
    private _messageService: MessageService) { }

  ngOnInit(): void {
    this.showLoader();
    const self = this;


    this._languageService.getLanguageForEdit(this.languageId).then(res => {
      let result = res.result;
      this.language = result.language;
      this.languageNamesSelectItems = _.map(result.languageNames, function (language) {
        return {
          label: language.displayText, value: language.value
        };
      });
      this.flagsSelectItems = _.map(result.flags, function (flag) {
        return {
          label: flag.displayText, value: flag.value
        };
      });

      if (!this.languageId) {
        this.language.isEnabled = true;
      }

    }).finally(() => {
      this.hideLoader();
    });
  }

  showCreateEditLoader() {
    this.createLoader = true;
  }

  hideCreateEditLoader() {
    this.createLoader = false;
  }

  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }

  save(): void {
    this.showLoader();

    let input = new CreateOrUpdateLanguageInput();
    input.language = this.language;
    this._languageService.createOrEdit(input)
      .then(() => {
        this._messageService.showSuccess("", this._translate.instant('SavedSuccessfully'));
        this.close();
      }).finally(() => {
        this.hideLoader();
      });
  }

  close(): void {
    this.$modalClose.emit();
  }

}
