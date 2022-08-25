import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { EditionsSelectOutput, EditionWithFeaturesDto, FlatFeatureSelectDto } from 'src/app/core/models/Admin/select-edition';
import { EditionPaymentType, EditionSelectDto, SubscriptionStartType } from 'src/app/core/models/Admin/Subscription';
import { AppSessionService } from 'src/app/core/services/app-session.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import * as _ from 'lodash';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-select-edition',
  templateUrl: './select-edition.component.html',
  styleUrls: ['./select-edition.component.scss']
})
export class SelectEditionComponent implements OnInit {


  editionsSelectOutput: EditionsSelectOutput = new EditionsSelectOutput();
  isUserLoggedIn = false;
  isSetted = false;
  isLoading = false;
  editionPaymentType: typeof EditionPaymentType = EditionPaymentType;
  subscriptionStartType: typeof SubscriptionStartType = SubscriptionStartType;
  /*you can change your edition icons order within editionIcons variable */
  editionIcons: string[] = ['fa-solid fa-box-open', 'fa-solid fa-box-open', 'fa-solid fa-box-open', 'flaticon-confetti', 'flaticon-cogwheel-2', 'flaticon-app', 'flaticon-coins', 'flaticon-piggy-bank', 'flaticon-bag', 'flaticon-lifebuoy', 'flaticon-technology-1', 'flaticon-cogwheel-1', 'flaticon-infinity', 'flaticon-interface-5', 'flaticon-squares-3', 'flaticon-interface-6', 'flaticon-mark', 'flaticon-business', 'flaticon-interface-7', 'flaticon-list-2', 'flaticon-bell', 'flaticon-technology', 'flaticon-squares-2', 'flaticon-notes', 'flaticon-profile', 'flaticon-layers', 'flaticon-interface-4', 'flaticon-signs', 'flaticon-menu-1', 'flaticon-symbol'];



  constructor(private _messageService: MessageService,
    private _authService: AuthenticationService,
    private modalService: NgbModal,
    public appSession: AppSessionService,
    private _subscriptionService: SubscriptionService,
    private _router: Router,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.isUserLoggedIn = this._authService.isUserLoggedIn();
    this.showMainLoader();
    this._subscriptionService.getEditionsForSelect()
      .subscribe((result) => {
        this.hideMainLoader()
            this.editionsSelectOutput = result.result;
            if (!this.editionsSelectOutput.editionsWithFeatures || this.editionsSelectOutput.editionsWithFeatures.length <= 0) {
                this._router.navigate(['/admin/register-tenant']);
            }
        });
  }

  isFree(edition: EditionSelectDto): boolean {
    return this._subscriptionService.isEditionFree(edition);
}

isTrueFalseFeature(feature: FlatFeatureSelectDto): boolean {
    return feature.inputType.name === 'CHECKBOX';
}

featureEnabledForEdition(feature: FlatFeatureSelectDto, edition: EditionWithFeaturesDto): boolean {
    const featureValues = _.filter(edition.featureValues, { name: feature.name });
    if (!featureValues || featureValues.length <= 0) {
        return false;
    }

    const featureValue = featureValues[0];
    return featureValue.value.toLowerCase() === 'true';
}

getFeatureValueForEdition(feature: FlatFeatureSelectDto, edition: EditionWithFeaturesDto): string {
    const featureValues = _.filter(edition.featureValues, { name: feature.name });
    if (!featureValues || featureValues.length <= 0) {
        return '';
    }

    const featureValue = featureValues[0];
    return featureValue.value;
}

  upgrade(upgradeEdition: EditionSelectDto, editionPaymentType: EditionPaymentType): void {
    this._router.navigate(['/admin/upgrade'], { queryParams: { upgradeEditionId: upgradeEdition.id, editionPaymentType: editionPaymentType } });
}


  showMainLoader() {
    this.isLoading = true;
  }

  hideMainLoader() {
    this.isLoading = false;
}


}
