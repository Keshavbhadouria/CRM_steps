export class CreateOrEditContactEmailHistoryDto {
  subject!: string;
  bodyMessage!: string;
  gateway!: string | undefined;
  gatewayResponse!: string | undefined;
  attachmentUrl!: string | undefined;
  userId!: number | undefined;
  contactId!: number | undefined;
  id!: string | undefined;
}
