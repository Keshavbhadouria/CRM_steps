export class GetContactTaskForViewDto {
  contactTask!: ContactTaskDto;
  userName!: string | undefined;
  roleName!: string | undefined;
  contactCompany!: string | undefined;
  activityTaskStageStageName!: string | undefined;
  activityPriorityPriorityName!: string | undefined;
}

export class ContactTaskDto {
  title!: string | undefined;
  description!: string | undefined;
  htmlDescription!: string | undefined;
  dueDate!: moment.Moment;
  userId!: number | undefined;
  roleId!: number;
  contactId!: number | undefined;
  activityTaskStageId!: number;
  activityPriorityId!: number | undefined;
  id!: string;
}
