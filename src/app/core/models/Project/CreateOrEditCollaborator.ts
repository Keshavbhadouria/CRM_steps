export class CreateOrEditCollaboratorDto {
  id!: string | undefined;
  timezone: string;
  weeklyHoursAvailabilty: number;
  workingTimeFromToEstTime: string;
  active: boolean;
  velocity: number;
  performance: number;
  fullname: string;
  userId: number | null;
  jobDescriptionId: string | null;
  user: UserEditDto = new UserEditDto();
  assignedRoleNames: string[];
}

export class UserEditDto {
  id!: number | undefined;
  name!: string;
  surname!: string;
  userName!: string;
  emailAddress!: string;
  country!: string;
  phoneNumber!: string | undefined;
  password!: string | undefined;
  isActive!: boolean;
}

export class CollaboratorSkillsDto {
  id!: number | undefined;
  YearsExperience!: number;
  SkillId!: number;
  CollaboratorNewId!: string;
}

export class CollaboratorAbsense {
  id!: number | undefined;
  AbsenseDate!: Date;
  Reason!: string;
  CollaboratorNewId!: string;
}

export class CollaboratorNotice {
  id!: number | undefined;
  NoticeDate!: Date;
  Reason!: string;
  Note!: string;
  Filename!: string;
  FileURL!: string;
  CollaboratorNewId!: string;
}

