import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreateOrEditContactPreferrenceDto } from 'src/app/core/models/Customer/Preference';
import { ContactPreferenceService } from 'src/app/core/services/contact-preference.service';

@Component({
  selector: 'preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.scss']
})
export class PreferenceComponent implements OnInit {


  isLoading: boolean = false;
  isSavingLoading: boolean = false;
  contactId: number;
  id: any;
  data: CreateOrEditContactPreferrenceDto = new CreateOrEditContactPreferrenceDto();
  preferenceList: any = [
    { activeIndex: 0, title: 'Phone Call', isActive: false },
    { activeIndex: 1, title: 'SMS', isActive: false },
    { activeIndex: 2, title: 'Email', isActive: false },
    { activeIndex: 3, title: 'Whatsapp', isActive: false },
    { activeIndex: 4, title: 'Notification', isActive: false }
  ]



  constructor(
    private _contactPreferrencesService: ContactPreferenceService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.contactId = Number(this.route.snapshot.paramMap.get('contactId'));
    this.getContactPreferences();
  }


  getContactPreferences() {
    this.showLoader();
    this._contactPreferrencesService.getAllByContactId(this.contactId).then(result => {
      if (result.result.totalCount > 0) {
        this.preferenceList[0].isActive = result.result.items[0].contactPreferrence.phone;
        this.preferenceList[1].isActive = result.result.items[0].contactPreferrence.sms;
        this.preferenceList[2].isActive = result.result.items[0].contactPreferrence.email;
        this.preferenceList[3].isActive = result.result.items[0].contactPreferrence.whatsApp;
        this.preferenceList[4].isActive = result.result.items[0].contactPreferrence.pushNotification;
        this.id = result.result.items[0].contactPreferrence.id;
      }

    })
      .finally(() => this.hideLoader());
  }

  createOrEditContactPreferences() {
    this.data.phone = this.preferenceList[0].isActive;
    this.data.sms = this.preferenceList[1].isActive;
    this.data.email = this.preferenceList[2].isActive;
    this.data.whatsApp = this.preferenceList[3].isActive;
    this.data.pushNotification = this.preferenceList[4].isActive;
    this.data.contactId = this.contactId;
    this.data.id = this.id;
    this.showSavingLoader()
    this._contactPreferrencesService.createOrEdit(this.data).then(result => {
      this.getContactPreferences();
    }).finally(() => {
    this.hideSavingLoader()
    });
  }


  //#region Helper Methods

  showLoader() {
    this.isLoading = true;
  }

  hideLoader() {
    this.isLoading = false;
  }

  showSavingLoader() {
    this.isSavingLoading = true;
  }

  hideSavingLoader() {
    this.isSavingLoading = false;
  }



  //#endregion

}
