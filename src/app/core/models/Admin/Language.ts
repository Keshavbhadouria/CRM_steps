export class CreateOrUpdateLanguageInput {
  language!: ApplicationLanguageEditDto;
}

export class ApplicationLanguageEditDto {
  id!: number | undefined;
  name!: string;
  icon!: string | undefined;
  isEnabled!: boolean;

}


export interface SelectItem {
  label?: string;
  value: any;
  styleClass?: string;
  icon?: string;
  title?: string;
  disabled?: boolean;
}
