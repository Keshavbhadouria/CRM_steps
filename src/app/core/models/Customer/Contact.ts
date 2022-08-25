export class CreateOrEditContactDto  {
  company!: string;
  firstname!: string;
  lastname!: string;
  email!: string | undefined;
  phone!: string | undefined;
  extension!: string | undefined;
  preferredTime1!: string | undefined;
  preferredTime2!: string | undefined;
  address1!: string | undefined;
  address2!: string | undefined;
  city!: string | undefined;
  state!: string | undefined;
  country!: string | undefined;
  zipcode!: string | undefined;
  score!: number;
  webURL!: string | undefined;
  targetTitleId!: number | undefined;
  leadTemperatureId!: number | undefined;
  leadSourceId!: number | undefined;
  leadStageId!: number | undefined;
  leadStatusId!: number | undefined;
  actionTypeId!: number | undefined;
  promoCode!: string | undefined;
  id!: number | undefined;
}
