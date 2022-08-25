export class CreateOrEditLawfirmServiceDto  {
  servicesName!: string;
  price!: number;
  active!: boolean;
  description: string = '';
  questionary: string = '';
  lawfirmFeeTypeId!: number | undefined;
  id!: number | undefined;
}
