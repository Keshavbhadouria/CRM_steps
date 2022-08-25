export class RegisterTenantOutput {
  tenantId!: number;
  tenancyName!: string | undefined;
  name!: string | undefined;
  userName!: string | undefined;
  emailAddress!: string | undefined;
  isTenantActive!: boolean;
  isActive!: boolean;
  isEmailConfirmationRequired!: boolean;
}
