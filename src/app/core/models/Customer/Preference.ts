export class CreateOrEditContactPreferrenceDto{
  phone!: boolean;
  sms!: boolean;
  email!: boolean;
  whatsApp!: boolean;
  chat!: boolean;
  pushNotification!: boolean;
  contactId!: number | undefined;
  id!: string | undefined;
}

