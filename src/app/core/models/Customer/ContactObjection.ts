export class GetContactObjectionForViewDto {
  contactObjection!: ContactObjectionDto;
  contactCompany!: string | undefined;
  objectionEntityObjection!: string | undefined;
  leadTemperatureTemperature!: string | undefined;
  objectionHandler!: string | undefined;
}



export class ContactObjectionDto {
  active!: boolean;
  comments!: string | undefined;
  contactId!: number | undefined;
  contactName!: string | undefined;
  objectionEntityId!: number | undefined;
  leadTemperatureId!: number | undefined;
  id!: string;
}


export class GetObjectionEntityForViewDto {
  static fromJS(item: any): any {
    throw new Error('Method not implemented.');
  }
  objectionEntity!: ObjectionEntityDto;
  objectionsIndustryIndustry!: string | undefined;
}

export class ObjectionEntityDto {
  objection!: string | undefined;
  objectionHandler!: string | undefined;
  active!: boolean;
  objectionsIndustryId!: number | undefined;
  id!: number;
}

export class CreateOrEditContactObjectionDto {
  active!: boolean;
  comments!: string | undefined;
  contactId!: number | undefined;
  objectionEntityId!: number | undefined;
  leadTemperatureId!: number | undefined;
  id!: string | undefined;
}
