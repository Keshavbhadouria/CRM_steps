import { Component, OnInit, ViewChild } from '@angular/core';
import { AppPoliciesService } from 'src/app/core/services/app-policies.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'termOrConditionModal',
  templateUrl: './term-condition-modal.component.html',
  styleUrls: ['./term-condition-modal.component.scss']
})
export class TermConditionModalComponent {
  @ViewChild('termOrConditionModal', { static: true }) modal: ModalDirective;
  policies = [];
  policyContentByType: any;
  policyType: any;
  constructor(
    private _policyService: AppPoliciesService) {

  }
    show(type: string) {
        this.getTermandCondition(type);

    }

  showPolicy(type: string, description?: string) {
        this.policyType = type === undefined ? type : type;
        this.policyContentByType = description === undefined ? type : description;
        this.modal.show();

    }

    getTermandCondition(type) {
        this._policyService.getPoliciesByName(type).subscribe(result => {
      this.policyType = result.type === undefined ? type : result.type;
      this.policyContentByType = result.description === undefined ? type : result.description;
      this.modal.show();
    });
  }
  close() {
    this.modal.hide();
  }
}
