export class CreateOrEditContactProductQuestionDto {
  questions!: string;
  solved!: boolean;
  contactId!: number;
  lawfirmServiceId!: number;
  id!: string | undefined;
}
