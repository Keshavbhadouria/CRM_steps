export class CreateOrEditStepDocumentsDto {
  document!: string;
  uploadByClientOrDeliverByLawyer!: boolean;
  notifyAdmin!: boolean;
  notifyCustomer!: boolean;
  notifyLaywer!: boolean;
  fee!: number;
  servicesActivityStepId!: number;
  lawfirmFeeTypeId!: number | undefined;
  lawfirmServiceId!: number | undefined;
  serviceActivityId!: number | undefined;
  id!: number | undefined;
  isSelected: boolean;
}
