import { AfterViewInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { expand, finalize } from 'rxjs/operators';
import { AppConsts } from 'src/app/core/constants/AppConstants';
import { RegisterTenantOutput } from 'src/app/core/models/Admin/RegisterTenantOutput';
import { CountryDto, CreateTenantWithUserDto, StateDto } from 'src/app/core/models/Tenant/CreateTenant';
import { AccountService } from 'src/app/core/services/account.service';
import { AppPoliciesService } from 'src/app/core/services/app-policies.service';
import { MessageService } from 'src/app/core/services/message.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { TenantRegistrationHelperService } from 'src/app/core/services/tenant-registration-helper.service';
import { TenantRegistrationService } from 'src/app/core/services/tenant-registration.service';
import { PasswordComplexitySetting } from 'src/app/core/services/users.service';
var creditCardType = require("credit-card-type");
import { SignaturePad } from 'angular2-signaturepad';
import { error } from '@angular/compiler/src/util';
import { TermConditionModalComponent } from './term-condition-modal/term-condition-modal.component';
import { CreatePaymentDto, EditionPaymentType, StripeCreatePaymentSessionInput, SubscriptionPaymentDto, SubscriptionPaymentGatewayType, SubscriptionStartType } from 'src/app/core/models/Admin/Subscription';
import { EditionHelperService } from 'src/app/core/services/edition-helper.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { KeyConstant } from 'src/app/core/constants/KeyConstants';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { PaymentHelperService } from 'src/app/core/services/payment-helper.service';
import { ScriptLoaderService } from 'src/app/core/services/script-loader.service';
import { StripePaymentService } from 'src/app/core/services/stripe-payment.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {

  stepIndex = 0;
  appPolicyList: any;

  registerForm: NgForm;
  model: CreateTenantWithUserDto = new CreateTenantWithUserDto();
  emailAddressToVerify: string = '';
  isEmailAddressMatching: boolean = true;
  isPasswordMatching: boolean = true;
  passwordComplexitySetting: PasswordComplexitySetting = new PasswordComplexitySetting();

  months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  years = [];
  countries: CountryDto[];
  states: StateDto[];
  signatureImage: any;
  isAllPoliciesAccepted: boolean = false;
  isLoadingStates = false;

  terms: boolean = false;
  privatePolicy: boolean = false;
  cancelNotice: boolean = false;
  spam: boolean = false;
  procedure: boolean = false;
  stateName: string = "";
  countryName: string = "";
  // signaturePad: boolean = false;
  isSubmitButtonDisabled: boolean = true;

  editionPaymentType: typeof EditionPaymentType = EditionPaymentType;
  subscriptionStartType: number;
  editionId: number;
  selectedPaymentPeriodType: number;
  recurringPaymentEnabled: boolean = false;
  tenantData: any | undefined;
  isTenantNameExists: boolean | undefined;

  amount = 0;
  description = '';

  subscriptionPayment: SubscriptionPaymentDto;
  stripeIsLoading = true;
  subscriptionPaymentGateway = SubscriptionPaymentGatewayType;


  paymentId;
  successCallbackUrl;
  errorCallbackUrl;

  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  @ViewChild('termOrConditionModal', { static: true }) termOrConditionModal: TermConditionModalComponent;

  showClearButton = false;
  submitted = false;
  saving = false;
  recaptchaSiteKey: string = AppConsts.recaptchaSiteKey;
  isLoading = false;

  public signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 800,
    'canvasHeight': 150,
    'clear': true,
  };

  creditCardIcon: string = 'fa fa-credit-card';
  cardIcons = [
    { card: 'Amrican Express', icon: 'fab fa-cc-amex' },
    { card: 'Diners Club', icon: 'fab fa-diners-club' },
    { card: 'JCB', icon: 'fab fa-cc-jcb' },
    { card: 'Discover', icon: 'fab fa-cc-discover' },
    { card: 'Visa', icon: 'fab fa-cc-visa' },
    { card: 'Mastercard', icon: 'fab fa-cc-mastercard' }
  ];
  expiryMonth: number;
  expiryYear: number;

  // @ViewChild('termOrConditionModal', { static: true }) termOrConditionModal: TermConditionModalComponent;

  constructor(
    private _appPoliciesService: AppPoliciesService,
    injector: Injector,
    private _tenantRegistrationService: TenantRegistrationService,
    private _router: Router,
    private _profileService: ProfileService,
    private _tenantRegistrationHelper: TenantRegistrationHelperService,
    private _editionHelperService: EditionHelperService,
    public authenticationService: AuthenticationService,
    private _activatedRoute: ActivatedRoute,
    private _reCaptchaV3Service: ReCaptchaV3Service,
    private _accountService: AccountService,
    private _messageService: MessageService,
    private _paymentAppService: PaymentService,
    private _paymnetHelperService: PaymentHelperService,
    private _stripePaymentAppService: StripePaymentService,
    private toastr: ToastrService,
    private cookieService: CookieService
  ) {

    this._appPoliciesService.getAll(null, null, null, 0, 100).subscribe(result => {
      this.appPolicyList = result.result.items;
    });
  }

  ngOnInit(): void {
    this.resetTenantdata();
    this.getYears();

    // var expTime = new Date();
    // expTime.setDate(  expTime.getDate() + 3 );
    //this.cookieService.set('.AspNetCore.Culture', "c=en|uic=en",expTime,"/");

    this._accountService.getAllCountryForTableDropdown().subscribe(result => {
      this.countries = result.result;
    });

    this._profileService.getPasswordComplexitySetting().subscribe(result => {
      this.passwordComplexitySetting = result.setting;

    });

  }

// getTestString(){
//   this._tenantRegistrationService.getText().subscribe(result => {
//     debugger;
//     this.countries = result.result;
//   });
// }

  resetTenantExists() {
    this.isTenantNameExists = undefined;
  }

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());
    this.signatureImage = this.signaturePad.toDataURL();

  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
    this.showClearButton = true;
  }

  clearSignaturePad() {
    this.signaturePad.clear();
  }

  get useCaptcha(): boolean {
    return true;
    //return this.setting.getBoolean('App.TenantManagement.UseCaptchaOnRegistration');
  }

  //#region Form Navigations

  gotoNextStep(form: NgForm) {
    // this.stepIndex = this.stepIndex + 1;
    this.registerForm = form;
    this.isFormValid();
  }

  gotoBackStep() {
    this.stepIndex = this.stepIndex - 1;
  }

  //#endregion



  //#region  Validation Methods

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  onVerifyEmail(args) {
    if (this.model.email === args.target.value) {
      this.isEmailAddressMatching = true;
    }
    else {
      this.isEmailAddressMatching = false;
    }
  }

  onVerifyPassword(args) {
    if (this.model.password === args.target.value) {
      this.isPasswordMatching = true;
    }
    else {
      this.isPasswordMatching = false;
    }
  }

  isFormValid(): boolean {
    let valid = false;
    switch (this.stepIndex) {
      case 0: valid = this.validateFirstForm();
        break;
      case 1: valid = this.validateSecondForm();
        break;
      case 2: valid = this.validateThirdForm();
        break;
      case 3:
        valid = this.validateSubscriptionForm();
      case 4: valid = true;
      case 5: valid = true;
        break;
    }
    return valid;
  }

  validateFirstForm(): boolean {

    if (!this.model.companyName) {
      this.model.companyName = this.model.firstName + " " + this.model.lastName;
    }

    if (this.registerForm.form.controls['TenancyName'].invalid ||
      this.registerForm.form.controls['FirstName'].invalid ||
      this.registerForm.form.controls['LastName'].invalid ||
      this.registerForm.form.controls['Email'].invalid ||
      this.registerForm.form.controls['PhoneNumber'].invalid ||
      this.registerForm.form.controls['Password'].invalid ||
      this.registerForm.form.controls['PasswordRepeat'].invalid ||
      this.model.password != this.registerForm.form.controls['PasswordRepeat'].value ||
      !this.isEmailAddressMatching) {
      return false;
    }
    this.stepIndex = this.stepIndex + 1;
    return true;
  }


  validateSecondForm(): boolean {
    if (this.registerForm.form.controls['Address1'].invalid ||
      this.registerForm.form.controls['City'].invalid ||
      this.registerForm.form.controls['PostalCode'].invalid ||
      this.registerForm.form.controls['CountryId'].invalid ||
      this.registerForm.form.controls['StateId'].invalid) {
      return false;
    }
    this.stepIndex = this.stepIndex + 1;
    return true;
  }

  validateThirdForm(): boolean {
    if (this.registerForm.form.controls['ccname'].invalid ||
      this.registerForm.form.controls['ccnumber'].invalid ||
      this.registerForm.form.controls['ccmonth'].invalid ||
      this.registerForm.form.controls['ccyear'].invalid ||
      this.registerForm.form.controls['cccvv'].invalid) {
      return false;
    }
    this.getStateAndCountryName();
    this.terms = false;
    this.privatePolicy = false;
    this.cancelNotice = false;
    this.spam = false;
    this.procedure = false;
    this.isAllPoliciesAccepted = false;
    this.isSubmitButtonDisabled = true;
    this.stepIndex = this.stepIndex + 1;
    return true;
  }

  validateSubscriptionForm(): boolean {
    if (!this.editionId) {
      this.toastr.error("Please Select Subscription!", "Error");
      return false
    }


    if (this.editionId && this.subscriptionStartType == SubscriptionStartType.Paid) {
      if (!this.selectedPaymentPeriodType) {
        this.toastr.error("Please Select Subscription Plan Type!", "Error");
        return false;
      }
    }
    this.stepIndex = this.stepIndex + 1;
    return true;
  }



  validateCreditCard() {
    let cards = creditCardType(this.model.creditCardNo);
    if (cards.length === 1) {
      let cardIcon = this.cardIcons.find(x => x.card === cards[0].niceType);
      if (cardIcon !== null && cardIcon !== undefined) {
        this.creditCardIcon = cardIcon.icon;
      }
    }
    else {
      this.creditCardIcon = 'fa fa-credit-card'
    }
  }


  //#endregion

  //#region Helper Methods


  saveImage(data) {
    this.signatureImage = data;
  }

  showImage(data) {
    this.signatureImage = data;
  }

  getYears() {
    for (let index = 0; index < 10; index++) {
      var year = moment().year();
      this.years.push(year + index);
    }
  }

  getStateAndCountryName(): void {
    var country = this.countries.filter(s => s.id === this.model.countryId)[0];
    if (country !== undefined) {
      this.countryName = country.name;
    }
    var state = this.states.filter(s => s.id === this.model.stateId)[0];
    if (state !== undefined) {
      this.stateName = state.name;
    }
  }

  checkterms() {
    this.terms = !this.terms;
    this.checkAllPoliciesAccepted();
  }



  checkPrivatePolicy() {
    this.privatePolicy = !this.privatePolicy;
    this.checkAllPoliciesAccepted();
  }

  checkSpam() {
    this.spam = !this.spam;
    this.checkAllPoliciesAccepted();
  }

  checkProcedure() {
    this.procedure = !this.procedure;
    this.checkAllPoliciesAccepted();
  }

  checkCancelNotice() {
    this.cancelNotice = !this.cancelNotice;
    this.checkAllPoliciesAccepted();
  }

  checkValue(event, value) {
    this.appPolicyList.forEach(element => {
      if (element.appPolicy.type == value) console.log(element.appPolicy);
    })
  }

  getPolicyByName(policyName) {
    let policyContent = policyName;
    this.appPolicyList.forEach(element => {
      if (element.appPolicy.type == policyName)
        policyContent = element.appPolicy.description;
    })
    return policyContent;
  }

  getEncriptedCC(creditCard) {
    var lastFour = (creditCard?.toString().substr(-4));
    return 'xxxx-xxxx-xxxx-' + lastFour;
  }

  checkAllPoliciesAccepted() {
    if ((this.terms && this.privatePolicy && this.cancelNotice && this.procedure && this.spam)) {
      this.isAllPoliciesAccepted = true
      this.isSubmitButtonDisabled = false;
    }
    else {
      this.isAllPoliciesAccepted = false;
      this.isSubmitButtonDisabled = true;
    }

  }

  //#endregion

  //#region  Form Submission

  isTenantExists(): void {
    if (this.model.tenancyName) {
      this.showMainLoader();
      const obj = {
        "tenancyName": this.model.tenancyName
      }
      // debugger;
      // this.getTestString();
      this.authenticationService.isTenantAvailable(obj).subscribe((res) => {
      //   debugger;
      // this.getTestString();
        this.tenantData = res.result;
        switch (this.tenantData?.state) {
          case 1:
            this.isTenantNameExists = true;
            this.resetTenantdata();
            this.hideMainLoader();
            break;
          case 2:
            this.isTenantNameExists = true;
            // this._messageService.showError("Common.Title.Error", "Messages.TenantAlreadyExists");
            this.resetTenantdata();
            this.hideMainLoader();
            break;
          case 3:
            this.isTenantNameExists = false;
            this.hideMainLoader();
            break;
          default:
            break;
        }
      });
    }
  }

  onSubmit(): void {
    this.showMainLoader();
    if (!(this.terms && this.privatePolicy && this.cancelNotice && this.procedure && this.spam)) {
      this._messageService.showInfo('Info', 'Please select all policies.');
      return;
    }

    this.submitted = true;

    if (this.model.cardType === 'Select Card') {
      this.model.cardType = '';
    }

    let recaptchaCallback = (token: string) => {
      this.saving = true;
      this.model.captchaResponse = token;
      this.model.signatureUrl = this.signatureImage;

      this._tenantRegistrationService.registerTenantWithUser(this.model)
        .pipe(finalize(() => { this.saving = false; }))
        .subscribe((result: RegisterTenantOutput) => {

          this._tenantRegistrationHelper.registrationResult = result;
          // here right the Logic for Payment;
          this.loginUser()
          // this._router.navigate(['/account/register-tenant-result']);
        });
    };

    if (this.useCaptcha) {
      this._reCaptchaV3Service.execute(this.recaptchaSiteKey, 'register', (token) => {
        recaptchaCallback(token);
      });
    } else {
      recaptchaCallback(null);
    }
  }

  //#endregion

  //#region API Methods

  getStates(countryId: string) {
    this.states = [];
    if (countryId === undefined || countryId === "") {
      this.states = [];
      return false;
    }
    this.isLoadingStates = true;
    this._accountService.getStates(countryId).subscribe(result => {
      this.isLoadingStates = false;
      this.states = result.result;
    }),
      (error) => {
        this.isLoadingStates = false;
      }


      ;
  }
  //#endregion


  //#region Subscription

  setEditionAndPayment(val) {
    this.editionId = val.editionId;
    this.subscriptionStartType = val.subscriptionStartType;
    this.editionPaymentType = val.editionPaymentType;
    this.selectedPaymentPeriodType = val.selectedPaymentPeriodType;
    this.recurringPaymentEnabled = val.recurringPaymentEnabled;
  }


  createPlanSubscription() {

    this._tenantRegistrationService.getEdition(this.editionId)
      .subscribe((resp) => {
        if (this._editionHelperService.isEditionFree(resp.result)) {
          this._paymentAppService.switchBetweenFreeEditions(resp.result.id)
            .subscribe((res) => {
              this.resetTenantdata();
              this._router.navigate(['/account/login']);
            });
        } else {
          this.checkout(2);  //2 is for stripe payment
          //First Create Payment Against Tenant then Redirect to buy
          //this.redirectToBuy();
        }
      });
    return;
  }

  checkout(gatewayType) {
    this.showMainLoader();
    let input = {} as CreatePaymentDto;
    input.editionId = this.editionId;
    input.editionPaymentType = ((this.editionPaymentType) as any);
    input.paymentPeriodType = ((this.selectedPaymentPeriodType) as any);
    input.recurringPaymentEnabled = this.recurringPaymentEnabled;
    input.subscriptionPaymentGatewayType = gatewayType;
    input.successUrl = environment.apiURL + '/api/services/app/payment/' + this._paymnetHelperService.getEditionPaymentType(this.editionPaymentType) + 'Succeed';
    input.errorUrl = environment.apiURL + '/api/services/app/payment/PaymentFailed';

    this._paymentAppService.createPayment(input)
      .subscribe((res: any) => {
        if (res.success) {
          this.resetTenantdata();
          this._router.navigate(['/account/login']);
        } else {
          this.hideMainLoader();
          this._messageService.showServerSideError();
        }
        // this._router.navigate(['admin/' + this.getPaymentGatewayType(gatewayType).toLocaleLowerCase() + '-purchase'],
        //     {
        //         queryParams: {
        //             paymentId: res.result,
        //             redirectUrl: 'account/register-tenant-result'
        //         }
        //     });
        // this.makePaymentThroughStripe(res.result)
      },
        (error) => {
          this._messageService.showError(error.error?.messages || "Some thing went wrong.", "Common.Title.Error");
          this.resetTenantdata();
          this.hideMainLoader();
        }
      );
  }


  makePaymentThroughStripe(paymentId) {
    this.showMainLoader()
    new ScriptLoaderService().load('https://js.stripe.com/v3').then(() => {
      this._stripePaymentAppService.getConfiguration()
        .subscribe(
          (res: any) => {
            let config = res.result;
            this._stripePaymentAppService.createPaymentSession(new StripeCreatePaymentSessionInput({
              paymentId: paymentId,
              successUrl: environment.frontEndURL + '/dashboard',
              cancelUrl: environment.frontEndURL + '/admin/stripe-cancel-payment'
            })).subscribe(
              (res: any) => {
                let sessionId = res.result;
                this._paymentAppService.getPayment(paymentId)
                  .subscribe(
                    (res: any) => {
                      let result = res.result;
                      // this.spinnerService.hide();
                      this.amount = result.amount;
                      this.description = result.description;
                      this.successCallbackUrl = result.successUrl;
                      this.errorCallbackUrl = result.errorUrl;
                      let stripe = (<any>window).Stripe(config.publishableKey);
                      let checkoutButton = document.getElementById('stripe-checkout');
                      checkoutButton.addEventListener('click', function () {
                        stripe.redirectToCheckout({ sessionId: sessionId });
                      });

                      checkoutButton.click();
                      this.hideMainLoader();
                    },
                    (err) => {
                      this.hideMainLoader();
                    });
              },
              (err) => {
                this.hideMainLoader();
              }
            );
          },
          (err) => {
            this.hideMainLoader();
          });
    }).catch(err => {
      this.hideMainLoader();
    });
  }


  showMainLoader() {
    this.isLoading = true;
  }

  hideMainLoader() {
    this.isLoading = false;
  }


  //#endregion


  //#region Auth

  loginUser() {
    this.isTenantAvailable();
  }
  //#region Authentication Methods

  isTenantAvailable(): void {
    this.showMainLoader();
    if (this.model.tenancyName) {
      const obj = {
        "tenancyName": this.model.tenancyName
      }
      this.authenticationService.isTenantAvailable(obj).subscribe((res) => {
        this.tenantData = res.result;
        switch (this.tenantData?.state) {
          case 1:
            this.setTenantAccount(this.tenantData.tenantId?.toString());
            this.login();
            // this.closeModal();
            break;
          case 2:
            this._messageService.showError("Messages.TenantNotActive", "Common.Title.Error");
            this.resetTenantdata();
            this.hideMainLoader();

            break;
          case 3:
            this._messageService.showError("Messages.TenantNotFound", "Common.Title.Error");
            this.resetTenantdata();
            this.hideMainLoader();
            break;
          default:
            break;
        }
      },
        (error) => {
          this._messageService.showError(error.error?.messages || "Some thing went wrong.", "Common.Title.Error");
          this.resetTenantdata();
          this.hideMainLoader();
        }
      )


    } else {
      this._messageService.showError("Messages.EnterTenantName", "Common.Title.Error");
      this.isLoading = false;
    }
  }

  login(): void {
    this.showMainLoader();
    const obj = {
      "userNameOrEmailAddress": 'admin',
      "password": this.model.password
    }

    this.authenticationService.loginUser(obj).subscribe((res) => {
      if (res.success) {
        this.setUserInfo(res.result);
        this.createPlanSubscription();

        //this._router.navigate(['/dashboard']);
      }
      else {
        this.toastr.error(res.error?.message || "Some thing went wrong.", 'Error');
      }
    },
      (error) => {
        this.toastr.error("Username or password incorrect" || "Some thing went wrong.", 'Error');
      },
    )
    //   .add(() => {
    //   this.hideMainLoader();
    // })
  }


  setTenantAccount(tenantId: string) {
    const obj = {
      tenantId: tenantId,
      tenantName: this.model.tenancyName
    }
    localStorage.setItem(KeyConstant.tenant, JSON.stringify(obj));
  }

  setUserInfo(authenticateResult: any) {

    localStorage.setItem(KeyConstant.userInfo, JSON.stringify(authenticateResult));
  }

  resetTenantdata() {
    localStorage.removeItem(KeyConstant.tenant)
    localStorage.removeItem(KeyConstant.userInfo)
  }



  //#endregion

}

