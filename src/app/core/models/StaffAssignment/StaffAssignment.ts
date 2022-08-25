
export class ContactAssignLawyerParalegalDTO {
  contactId!: number;
  userId!: number;
  paralegalIds!: number[] | undefined;
  tenantId!: number | undefined;
  lastModificationTime!: moment.Moment | undefined;
  lastModifierUserId!: number | undefined;
  creationTime!: moment.Moment;
  creatorUserId!: number | undefined;
  id!: string;
}


export class CreateOrEditContactAssignParalegalDto {
  contactId!: number | undefined;
  userId!: number | undefined;
  id!: string | undefined;
}
