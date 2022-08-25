export class CreateOrEditReteinerDto {
  expirationDate!: moment.Moment;
  totalAmount!: number;
  paymentPlan!: boolean;
  downpayment!: number;
  payments!: number;
  paymentAmount!: number;
  initialPaymentDate!: moment.Moment;
  signatureRequired!: boolean;
  contactId!: number | undefined;
  userId!: number | undefined;
  contracTemplateNameId!: string | undefined;
  id!: string | undefined;
}
