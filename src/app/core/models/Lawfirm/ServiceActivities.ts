export class CreateOrEditServiceActivityDto  {
  activityName!: string;
  sortIndex!: number;
  active!: boolean;
  description: string = '';
  htmlDescription!: string | undefined;
  lawfirmServiceId!: number | undefined;
  id!: number | undefined;
}
