export enum SubscriptionStartType {
  Free = 1,
  Trial = 2,
  Paid = 3,
}

export enum SubscriptionPaymentType {
  Manual = 0,
  RecurringAutomatic = 1,
  RecurringManual = 2,
}

export class UserLoginInfoDto {
  name!: string | undefined;
  surname!: string | undefined;
  userName!: string | undefined;
  emailAddress!: string | undefined;
  profilePictureId!: string | undefined;
  id!: number;
}

export class EditionInfoDto  {
  displayName!: string | undefined;
  trialDayCount!: number | undefined;
  monthlyPrice!: number | undefined;
  annualPrice!: number | undefined;
  isHighestEdition!: boolean;
  isFree!: boolean;
  id!: number;
}

export class PaymentGatewayModel {
  gatewayType!: SubscriptionPaymentGatewayType;
  supportsRecurringPayments!: boolean;
}

export class PaymentInfoDto  {
  edition!: EditionSelectDto;
  additionalPrice!: number;

}

export class AdditionalData {
  paypal!: { [key: string]: string; };
  stripe!: { [key: string]: string; };
}

export class EditionSelectDto  {
  id!: number;
  name!: string | undefined;
  displayName!: string | undefined;
  expiringEditionId!: number | undefined;
  dailyPrice!: number | undefined;
  weeklyPrice!: number | undefined;
  monthlyPrice!: number | undefined;
  annualPrice!: number | undefined;
  trialDayCount!: number | undefined;
  waitingDayAfterExpire!: number | undefined;
  isFree!: boolean;
  additionalData!: AdditionalData | undefined;
}

export enum PaymentPeriodType {
  Daily = 1,
  Weekly = 7,
  Monthly = 30,
  Annual = 365,
}

export enum SubscriptionPaymentStatus {
  NotPaid = 1,
  Paid = 2,
  Failed = 3,
  Cancelled = 4,
  Completed = 5,
}

export class SubscriptionPaymentDto {
  description!: string | undefined;
  gateway!: SubscriptionPaymentGatewayType;
  amount!: number;
  editionId!: number;
  tenantId!: number;
  dayCount!: number;
  paymentPeriodType!: PaymentPeriodType;
  paymentId!: string | undefined;
  payerId!: string | undefined;
  editionDisplayName!: string | undefined;
  invoiceNo!: number;
  status!: SubscriptionPaymentStatus;
  isRecurring!: boolean;
  externalPaymentId!: string | undefined;
  successUrl!: string | undefined;
  errorUrl!: string | undefined;
  editionPaymentType!: EditionPaymentType;
  id!: number;

}

export interface IPaymentInfoDto {
  edition: EditionSelectDto;
  additionalPrice: number;
}

export enum EditionPaymentType {
  NewRegistration = 0,
  BuyNow = 1,
  Upgrade = 2,
  Extend = 3,
}


export enum SubscriptionPaymentGatewayType {
  Paypal = 1,
  Stripe = 2,
}

export class ApplicationInfoDto  {
  version!: string | undefined;
  releaseDate!: moment.Moment;
  currency: string | undefined = 'usd';
  currencySign: string | undefined = '$';
  allowTenantsToChangeEmailSettings!: boolean;
  userDelegationIsEnabled!: boolean;
  features!: { [key: string]: boolean; } | undefined;
}



export class TenantLoginInfoDto {
  tenancyName!: string | undefined;
  name!: string | undefined;
  logoId!: string | undefined;
  logoFileType!: string | undefined;
  customCssId!: string | undefined;
  subscriptionEndDateUtc!: moment.Moment | undefined;
  isInTrialPeriod!: boolean;
  subscriptionPaymentType!: SubscriptionPaymentType;
  edition!: EditionInfoDto;
  creationTime!: moment.Moment;
  paymentPeriodType!: PaymentPeriodType;
  subscriptionDateString!: string | undefined;
  creationTimeString!: string | undefined;
  id!: number;
}


export class UiCustomizationSettingsDto  {
  isLeftMenuUsed!: boolean;
  isTopMenuUsed!: boolean;
  isTabMenuUsed!: boolean;
  allowMenuScroll!: boolean;
}

export class GetCurrentLoginInformationsOutput {
  user!: UserLoginInfoDto;
  impersonatorUser!: UserLoginInfoDto;
  tenant!: TenantLoginInfoDto;
  impersonatorTenant!: TenantLoginInfoDto;
  application!: ApplicationInfoDto;
  theme!: UiCustomizationSettingsDto;
}

export class CreatePaymentDto {
  editionId!: number;
  editionPaymentType!: EditionPaymentType;
  paymentPeriodType!: PaymentPeriodType;
  subscriptionPaymentGatewayType!: SubscriptionPaymentGatewayType;
  recurringPaymentEnabled!: boolean;
  successUrl!: string | undefined;
  errorUrl!: string | undefined;
}

export class RefundPaymentDto {
  Id!: number;
  ExternalPaymentId!: string;
  RefundPaymentReasonId!: number;
  RefundComments!: string;
}


export class PayPalConfigurationDto {
  clientId!: string | undefined;
  demoUsername!: string | undefined;
  demoPassword!: string | undefined;

}

export interface IStripeCreatePaymentSessionInput {
  paymentId: number;
  successUrl: string | undefined;
  cancelUrl: string | undefined;
}

export class StripeCreatePaymentSessionInput  {
  paymentId!: number;
  successUrl!: string | undefined;
  cancelUrl!: string | undefined;

  constructor(data?: IStripeCreatePaymentSessionInput) {
    if (data) {
        for (var property in data) {
            if (data.hasOwnProperty(property))
                (<any>this)[property] = (<any>data)[property];
        }
    }
}
}


export interface IStripeCreatePaymentSessionInput {
  paymentId: number;
  successUrl: string | undefined;
  cancelUrl: string | undefined;
}

export interface IStripePaymentResultOutput {
  paymentDone: boolean;
}

export class StripePaymentResultOutput implements IStripePaymentResultOutput {
  paymentDone!: boolean;

  constructor(data?: IStripePaymentResultOutput) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

}
