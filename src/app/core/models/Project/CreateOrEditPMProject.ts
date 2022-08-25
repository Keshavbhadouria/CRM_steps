export class CreateOrEditPMProjectDto {
  projectName!: string;
  goal: string = '';
  startDate!: Date;
  targetDate!: Date;
  baselineVelocity!: number;
  actualVelocity!: number;
  teamChannel!: string | undefined;
  logo!: string | undefined;
  customer!: number | undefined;
  industry!: number;
  teamLeader!: number | undefined;
  priority!: number;
  status!: number | undefined;
  id!: number | undefined;
}

export class DropdownDto {
  id!: number;
  displayName!: string | undefined;
}

