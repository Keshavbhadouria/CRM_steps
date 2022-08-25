export class CreateOrEditServicesActivityStepDto  {
  step!: string;
  sortIndex!: number;
  active!: boolean;
  doOnDay!: number;
  a_OverDue!: boolean;
  a_Completed!: boolean;
  a_Updated!: boolean;
  l_Overdue!: boolean;
  l_Completed!: boolean;
  l_Update!: boolean;
  c_Overdue!: boolean;
  c_Completed!: boolean;
  c_Update!: boolean;
  description: string = '';
  htmlDescription!: string | undefined;
  serviceActivityId!: number | undefined;
  lawfirmServiceId!: number | undefined;
  contactTaskRoleId!: number | undefined;
  id!: number | undefined;
  isSelected: boolean;
}
