export class UserSMSFriendDto {
  contactId!: number;
  fullName!: string | undefined;
  phone!: string | undefined;
}

export class UserFriendMessagesDto {
  message!: string | undefined;
  messageDateTime!: moment.Moment;
  inbound!: boolean;
  readonly formattedMsgDateTime!: string | undefined;
}
