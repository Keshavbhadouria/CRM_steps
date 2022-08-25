import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'src/app/core/services/message.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { PasswordComplexitySetting, UserEditDto, UserRoleDto, UsersService, CreateOrUpdateUserInput } from 'src/app/core/services/users.service';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';

@Component({
  selector: 'app-current-info',
  templateUrl: './current-info.component.html',
  styleUrls: ['./current-info.component.scss']
})
export class CurrentInfoComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('targetDate') targetDate: ElementRef;

  @Input() userId: number | undefined;
  // @Output() $modalClose = new EventEmitter();


  loading = false;
  createLoader = false;

  canChangeUserName = true;
  isTwoFactorEnabled = false;
  isLockoutEnabled = false;
  passwordComplexitySetting: PasswordComplexitySetting = new PasswordComplexitySetting();

  user: UserEditDto = new UserEditDto();
  roles: UserRoleDto[];
  sendActivationEmail = true;
  setRandomPassword = true;
  passwordComplexityInfo = '';
  profilePicture: string;
  userPasswordRepeat = '';

  appRootUrl = environment.apiURL;

  constructor(private _userService: UsersService,
    private _profileService: ProfileService,
    private _translate: TranslateService,
    private _messageService: MessageService) { }

  ngOnInit(): void {

    if (!this.userId) {
      this.setRandomPassword = true;
      this.sendActivationEmail = true;
    }

    this.showLoader();
    this._userService.getUserForEdit(this.userId).then(result => {
      let userResult = result.result;
      this.user = userResult.user;
      this.roles = userResult.roles;

      this.hideLoader();

      this.getProfilePicture(this.userId);

      if (this.userId) {
        setTimeout(() => {
          this.setRandomPassword = false;
        }, 0);

        this.sendActivationEmail = false;
      }

      this._profileService.getPasswordComplexitySetting().then(result => {
        let passwordComplexityResult = result.result;
        this.passwordComplexitySetting = passwordComplexityResult.setting;
        this.setPasswordComplexityInfo();
      });


    })

  }
  getProfilePicture(userId: number) {
    if (!userId) {
      this.profilePicture = '/assets/icons/default-user.png';
      return;
    }

    this._profileService.getProfilePictureByUser(userId).then(result => {
      if (result.result && result.result.profilePicture) {
        this.profilePicture = 'data:image/jpeg;base64,' + result.result.profilePicture;
      } else {
        this.profilePicture = '/assets/icons/default-user.png';
      }
    });
  }
  setPasswordComplexityInfo(): void {

    this.passwordComplexityInfo = '<ul>';

    if (this.passwordComplexitySetting.requireDigit) {
      this.passwordComplexityInfo += '<li>' + this._translate.instant('PasswordComplexity_RequireDigit_Hint') + '</li>';
    }

    if (this.passwordComplexitySetting.requireLowercase) {
      this.passwordComplexityInfo += '<li>' + this._translate.instant('PasswordComplexity_RequireLowercase_Hint') + '</li>';
    }

    if (this.passwordComplexitySetting.requireUppercase) {
      this.passwordComplexityInfo += '<li>' + this._translate.instant('PasswordComplexity_RequireUppercase_Hint') + '</li>';
    }

    if (this.passwordComplexitySetting.requireNonAlphanumeric) {
      this.passwordComplexityInfo += '<li>' + this._translate.instant('PasswordComplexity_RequireNonAlphanumeric_Hint') + '</li>';
    }

    if (this.passwordComplexitySetting.requiredLength) {
      this.passwordComplexityInfo += '<li>' + this._translate.instant('PasswordComplexity_RequiredLength_Hint', this.passwordComplexitySetting.requiredLength) + '</li>';
    }

    this.passwordComplexityInfo += '</ul>';
  }

  getAssignedRoleCount(): number {
    return _.filter(this.roles, { isAssigned: true }).length;
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
    let input = new CreateOrUpdateUserInput();

    input.user = this.user;
    input.setRandomPassword = this.setRandomPassword;
    input.sendActivationEmail = this.sendActivationEmail;
    input.assignedRoleNames =
      _.map(
        _.filter(this.roles, { isAssigned: true, inheritedFromOrganizationUnit: false }), role => role.roleName
      );

    //input.organizationUnits = this.organizationUnitTree.getSelectedOrganizations();

    //this.saving = true;
    this._userService.createOrEdit(input).then(() => {
      this.hideLoader();
      this._messageService.showSuccess("", this._translate.instant('SavedSuccessfully'));
      this.close();
    }).finally(() => {
      this.hideLoader()
    });

  }

  close(): void {
    this.$modalClose.emit();
  }
}


