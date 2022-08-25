export class CreateTenantWithUserDto {
  firstName!: string;
  lastName!: string;
  email!: string;
  phoneNumber!: string;
  cellPhoneNumber!: string | undefined;
  companyName!: string | undefined;
  website!: string | undefined;
  password!: string;
  passwordRepeat!: string | undefined;
  address1!: string;
  address2!: string | undefined;
  city!: string;
  postalCode!: string;
  countryId!: string;
  stateId!: string;
  nameOnCard!: string;
  creditCardNo!: string;
  cvv!: string;
  expiryMonth!: string;
  expiryYear!: string;
  cardType!: string | undefined;
  captchaResponse!: string | undefined;
  tenancyName!: string;
  signatureUrl!: string;
}


export class CountryDto {
  name!: string | undefined;
  code!: string | undefined;
  dial!: string | undefined;
  id!: string;
}


export class StateDto {
  name!: string | undefined;
  regionCode!: string | undefined;
  countryId!: string;
  id!: string;
}
