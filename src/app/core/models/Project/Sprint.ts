export class CreateOrEditPMSprintStatusDto {
  status!: string;
  id!: number | undefined;
}


export class CreateOrEditPMSprintTypeDto {
  type!: string;
  id!: number | undefined;
}


export class CreateOrEditPMSprintDto {
  sprint!: string;
  description!: string;
  startDate!: Date;
  endDate!: Date;
  releaseDate!: Date;
  storyPoints!: number;
  project!: number;
  stage!: number | undefined;
  id!: number | undefined;
  moveToSprintId!: number | undefined;
}
