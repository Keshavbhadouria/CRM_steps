export class CreateOrEditContracTemplateNameDto {
  contractName!: string;
  active!: boolean;
  id!: string | undefined;
}


export class CreateOrEditCustomerContratTemplateDto {
  contractName!: string;
  physicalFileUrl!: string | undefined;
  createdOn!: moment.Moment;
  contactId!: number | undefined;
  contracTemplateNameId!: string | undefined;
  contractStatusId!: number | undefined;
  userId!: number | undefined;
  customerContractDetail!: CreateOrEditCustomerContractDetailDto[] | undefined;
  id!: number | undefined;
}

export class CreateOrEditCustomerContractDetailDto  {
  title!: string;
  content!: string;
  sortIndex!: number;
  customerContratTemplateId!: number | undefined;
  id!: string | undefined;
}
