export class CreateOrEditContractTemplateDetailDto {
  title!: string;
  content: string = '';
  htmlContent!: string | undefined;
  sortIndex!: number;
  active!: boolean;
  contracTemplateNameId!: string | undefined;
  id!: string | undefined;
}


export class CreateOrEditCustomerContractDetailDto {
  title!: string;
  content!: string;
  sortIndex!: number;
  customerContratTemplateId!: number | undefined;
  id!: string | undefined;
}

export class CreateOrEditCustomerContractSignatureDto {
  agreementDate!: moment.Moment;
  signatureUrl!: string;
  customerContratTemplateId!: number | undefined;
  userId!: number | undefined;
  id!: string | undefined;
}
