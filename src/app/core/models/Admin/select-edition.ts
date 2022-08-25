import { NameValueDto } from "../../services/supports.service";
import { AdditionalData } from "./Subscription";

export class EditionsSelectOutput  {
  allFeatures!: FlatFeatureSelectDto[] | undefined;
  editionsWithFeatures!: EditionWithFeaturesDto[] | undefined;

}


export class FlatFeatureSelectDto {
  parentName!: string | undefined;
  name!: string | undefined;
  displayName!: string | undefined;
  description!: string | undefined;
  defaultValue!: string | undefined;
  inputType!: IInputType;
  textHtmlColor!: string | undefined;
}

export class IInputType  {
  readonly name!: string | undefined;
  readonly attributes!: { [key: string]: any; } | undefined;
  validator!: IValueValidator;
}

export class IValueValidator {
  readonly name!: string | undefined;
  readonly attributes!: { [key: string]: any; } | undefined;
}

export class EditionWithFeaturesDto  {
  edition!: EditionSelectDto;
  featureValues!: NameValueDto[] | undefined;

}

export class EditionSelectDto {
  id!: number;
  name!: string | undefined;
  displayName!: string | undefined;
  expiringEditionId!: number | undefined;
  dailyPrice!: number | undefined;
  weeklyPrice!: number | undefined;
  monthlyPrice!: number | undefined;
  annualPrice!: number | undefined;
  trialDayCount!: number | undefined;
  waitingDayAfterExpire!: number | undefined;
  isFree!: boolean;
  additionalData!: AdditionalData | undefined;
}



