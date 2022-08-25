import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { AppPoliciesService, CreateOrEditAppPolicyDto } from 'src/app/core/services/app-policies.service';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown = false;
  filterText = '';
  typeFilter = '';
  active = false;
  saving = false;
  type: string;
  appPolicyForm: FormGroup;
  appPolicy: CreateOrEditAppPolicyDto = new CreateOrEditAppPolicyDto();
  isContentOpen: boolean = false;
  public Editor = ClassicEditor;
  loading = false;
  policyType = [
    {
      "type": "spam",
      "name": "Spam Policy"
    },
    {
      "type": "privacy",
      "name": "Privacy Policy"
    },
    {
      "type": "term",
      "name": "Terms and Conditions"
    },
    {
      "type": "procedure",
      "name": "Policy and Procedure"
    },
    {
      "type": "cancel",
      "name": "Cancellation Notice"
    },
    {
      "type": "cookie",
      "name": "Cookie Policy"
    },
    {
      "type": "refund",
      "name": "Refund Policy"
    }
  ]


  constructor(private _appPoliciesServiceProxy: AppPoliciesService, private _messageService: MessageService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Admin' }, { label: 'Policies', active: true }];
    this.appPolicyForm = new FormGroup({
      'appPolicy': new FormGroup({
        'description': new FormControl(null, [Validators.required])
      })
    });
  }
  onSelect(data: string): void {
    this.resetForm()
    this.showLoader();
    this._appPoliciesServiceProxy.getPoliciesByName(data).then(result => {
      this.appPolicy = result;
      this.appPolicyForm.setValue({
        'appPolicy': {
          'description': (result.result.description === null || result.result.description === undefined) ? 'Type Policy' : result.result.description
        }
      })
      this.hideLoader();
    });
  }
  formInit() {
    this.appPolicyForm = new FormGroup({
      'appPolicy': new FormGroup({
        'description': new FormControl('')
      })
    });
  }


  resetForm() {
    this.formInit();
    this.appPolicyForm.reset()
  }
  onSubmit(type: string) {
    this.showLoader();
    this.appPolicy.description = this.appPolicyForm.value["appPolicy"]["description"];
    this.appPolicy.type = type;
    this.saving = true;
    this._appPoliciesServiceProxy.createOrEdit(this.appPolicy)
      .then(() => {
        this._messageService.showSuccess("", "Saved Successfully");
        this.hideLoader();
      });
  }
  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }

}
