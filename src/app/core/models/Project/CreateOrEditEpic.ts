export class CreateOrEditPMEpicStatusDto {
  status:string = '';
  id!: number | undefined;
}



export class CreateOrEditEpicDto {
  name:string = '';
  description:string = '';
  businessOutcomeHypotesis:string = '';
  inScope:string = '';
  outScope:string = '';
  noFunctionalRequirements:string = '' ;
  mvP_Features:string = '' ;
  additionalPotentialFeatures:string = '';
  analysisSummary:string = '' ;
  userAffected:string = '' ;
  businessImpact:string = '' ;
  pmProjectId!: number;
  owner!: number;
  pmEpicStatusId!: number ;
  id!: number | undefined;
}
