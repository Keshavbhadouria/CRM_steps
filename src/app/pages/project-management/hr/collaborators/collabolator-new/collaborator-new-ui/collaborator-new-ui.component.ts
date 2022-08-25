import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'src/app/core/services/message.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { PasswordComplexitySetting, UserEditDto, UserRoleDto, UsersService, CreateOrUpdateUserInput } from 'src/app/core/services/users.service';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
import { CollaboratorsService } from 'src/app/core/services/collaborators.service';
import { CreateOrEditCollaboratorDto } from 'src/app/core/models/Project/CreateOrEditCollaborator';
import { AccountService } from 'src/app/core/services/account.service';
@Component({
  selector: 'app-collaborator-new-ui',
  templateUrl: './collaborator-new-ui.component.html',
  styleUrls: ['./collaborator-new-ui.component.scss']
})
export class CollaboratorNewUIComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('targetDate') targetDate: ElementRef;
  allJobDescriptions: any;

  @Input() userId: number | undefined;
  @Input() existingUser: boolean = false;
  // @Output() $modalClose = new EventEmitter();


  loading = false;
  editLoading = false;
  createLoader = false;

  canChangeUserName = true;
  isTwoFactorEnabled = false;
  isLockoutEnabled = false;
  passwordComplexitySetting: PasswordComplexitySetting = new PasswordComplexitySetting();

  collaborator: CreateOrEditCollaboratorDto = new CreateOrEditCollaboratorDto();
  roles: UserRoleDto[];
  sendActivationEmail = true;
  setRandomPassword = true;
  passwordComplexityInfo = '';
  profilePicture: string;
  userPasswordRepeat = '';
  jobDescriptionId: number;
  countries: any;
  collaboratorNewId: any;

  appRootUrl = environment.apiURL;

  constructor(private _userService: UsersService,private _collaboratorService: CollaboratorsService,
    private _profileService: ProfileService,
    private _translate: TranslateService,
    private _messageService: MessageService) {
     }

  ngOnInit(): void {
    this.loadDropDown();
    if (this.data && !this.existingUser) {
      if (this.data.collaboratorNew.id) {
        this.collaboratorNewId = this.data.collaboratorNew.id;
        this.showCreateEditLoader();
        this._collaboratorService.GetCollaboratorNewForEdit(this.data.collaboratorNew.id).then(result => {
          this.collaborator = result.result;
          this.roles = result.result.userRoleDtos;
          this.hideCreateEditLoader();
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
    }

    else
      if (this.userId > 0 && this.existingUser) {
        this.showCreateEditLoader();
      this._userService.getUserForEdit(this.userId).then(result => {
        let userResult = result.result;
        this.collaborator.user = userResult.user;
        this.roles = userResult.roles;
        if (this.userId) {
          setTimeout(() => {
            this.setRandomPassword = false;
          }, 0);
        }
        this._profileService.getPasswordComplexitySetting().then(result => {
          let passwordComplexityResult = result.result;
          this.passwordComplexitySetting = passwordComplexityResult.setting;
          this.setPasswordComplexityInfo();
        });
      }).finally(() => {
        this.hideCreateEditLoader();
      })
    }
  }


  loadDropDown() {
    this.showLoader();
    const promises = [
      this._collaboratorService.getRoles(),
      this._collaboratorService.getAllJobDescriptionForTableDropdown(),
      this._collaboratorService.getAllCountryForTableDropdown(),
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.roles = data[0].result;
          this.allJobDescriptions = data[1].result;
          this.countries = data[2].result;
          debugger;
        }
        this.hideLoader();
      });
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

  showEditLoader() {
    this.editLoading = true;
  }

  hideEditLoader() {
    this.editLoading = false;
  }

  save(): void {
    this.showLoader();
    // let input = new CreateOrUpdateUserInput();
    this.collaborator.assignedRoleNames =
      _.map(
        _.filter(this.roles, { isAssigned: true, inheritedFromOrganizationUnit: false }), role => role.roleName
      );

    // this.saving = true;
    this._collaboratorService.createOrEdit(this.collaborator).then((res) => {
      this.hideLoader();
      debugger
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


