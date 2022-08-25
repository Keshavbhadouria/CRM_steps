import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  AuthenticationService
} from '../../../core/services/auth.service';
import {
  AuthfakeauthenticationService
} from '../../../core/services/authfake.service';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  NgbModal
} from '@ng-bootstrap/ng-bootstrap';
import {
  TranslateService
} from '@ngx-translate/core';
import {
  LanguageService
} from 'src/app/core/services/language.service';
import {
  KeyConstant
} from 'src/app/core/constants/KeyConstants';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'src/app/core/services/message.service';


export interface MessageRes {
  Title: string,
  Message: string
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})




/**
 * Login component
 */
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  error = '';
  returnUrl: string;
  selectedTenant: string | null = 'Not Selected';
  display: boolean = false;
  mainLoading: boolean = false;
  submitting: boolean = false;
  checked: boolean = false;
  tenancyName: string | null = null;
  tenantData: any | undefined;
  ShowErrorBox: boolean = false;
  isLoading: boolean = false;
  loginLoading: boolean = false;
  errorMsg: string | undefined;
  username: string;
  password: string;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private _route: ActivatedRoute, private toastr: ToastrService,
    private _router: Router, public authenticationService: AuthenticationService, private modalService: NgbModal,
    private authFackservice: AuthfakeauthenticationService, public translate: TranslateService,
    private languageService: LanguageService, private _messageService: MessageService) {

    this.languageService.setLanguage('en');

  }

  ngOnInit(): void {
    if (this.authenticationService.getTenantName()) {
      this.checked = true;
      this.tenancyName = this.authenticationService.getTenantName();
      this.selectedTenant = this.authenticationService.getTenantName();
    }
  }

  loginUser() {
    if (this.tenancyName) {
      this.isTenantAvailable();
    } else {
      this.switchToHost();
    }
  }
  //#region Authentication Methods

  isTenantAvailable(): void {
    this.showLoader();
    if (this.tenancyName) {
      const obj = {
        "tenancyName": this.tenancyName
      }
      this.authenticationService.isTenantAvailable(obj).subscribe((res) => {
        this.isLoading = false;
        this.tenantData = res.result;
        switch (this.tenantData?.state) {
          case 1:
            this.setTenantAccount(this.tenantData.tenantId?.toString());
            this.selectedTenant = this.tenancyName;
            this.login();
            // this.closeModal();
            break;
          case 2:
            this._messageService.showError("Messages.TenantNotActive", "Common.Title.Error");
            this.resetTenantdata();

            this.hideLoader();
            // this.translate.get(["Messages.TenantNotActive", "Common.Title.Error"]).
            //   subscribe((res: any) => {
            //     this.resetTenantdata();
            //     this.toastr.error(Object.values(res)[0].toString(), Object.values(res)[1].toString());
            //   });
            break;
          case 3:
            this._messageService.showError("Messages.TenantNotFound", "Common.Title.Error");
            this.resetTenantdata();
            this.hideLoader();
            break;
          default:
            break;
        }
      },
        (error) => {
          this._messageService.showError(error.error?.messages || "Some thing went wrong.", "Common.Title.Error");
          this.resetTenantdata();
          this.hideLoader();
        }
      )


    } else {
      this._messageService.showError("Messages.EnterTenantName", "Common.Title.Error");
      this.isLoading = false;
    }
  }

  login(): void {
    this.showLoader();
    const obj = {
      "userNameOrEmailAddress": this.username,
      "password": this.password
    }

    this.authenticationService.loginUser(obj).subscribe((res) => {
      if (res.success) {
        this.setUserInfo(res.result);
        this._router.navigate(['/pm/project']);
      }
      else {
        this.toastr.error(res.error?.message || "Some thing went wrong.", 'Error');
      }
    },
      (error) => {
        this.toastr.error("Username or password incorrect" || "Some thing went wrong.", 'Error');
      },
    ).add(() => {
      this.hideLoader();
    })
  }

  logout() {
    this.authenticationService.logoutUser();
  }

  //#endregion

  //#region  Helper Methods


  showLoader() {
    this.loginLoading = true;
  }

  hideLoader() {
    this.loginLoading = false;
  }

  openModal(content: any) {
    this.modalService.open(content);
  }

  closeModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
  }

  selectionChange(ev: any) {
    if (!ev) {
      this.tenancyName = '';
      this.selectedTenant = 'Not Selected';
    }
  }

  setTenantAccount(tenantId: string) {
    const obj = {
      tenantId: tenantId,
      tenantName: this.tenancyName
    }
    localStorage.setItem(KeyConstant.tenant, JSON.stringify(obj));
  }

  switchToHost() {
    localStorage.removeItem(KeyConstant.tenant);
    this.login();
    // this.closeModal();
  }

  setUserInfo(authenticateResult: any) {

    localStorage.setItem(KeyConstant.userInfo, JSON.stringify(authenticateResult));
  }

  resetTenantdata() {
    this.tenancyName = null;
  }

  //#endregion

}
