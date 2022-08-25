import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { CreateOrEditCustomerContractDetailDto } from 'src/app/core/models/Retainer/ContractTemplateDetail';
import { MessageService } from 'src/app/core/services/message.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CustomerContractTemplateDetailService } from 'src/app/core/services/customer-contract-template-detail.service';

@Component({
  selector: 'app-customer-contract-detail-create-edit-modal',
  templateUrl: './customer-contract-detail-create-edit-modal.component.html',
  styleUrls: ['./customer-contract-detail-create-edit-modal.component.scss']
})
export class CustomerContractDetailCreateEditModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('targetDate') targetDate: ElementRef;
  public Editor = ClassicEditor;

  // bread crumb items
  loading = false;
  createLoader = false;
  loadingDropdown = false;
  breadCrumbItems: Array<{}>;

  allLawfirmcustomerContractDetails: DropdownDto[];
  allContactList: DropdownDto[];
  allUserList: DropdownDto[];
  allContractStatuss : DropdownDto[];


  contracTemplateName: string;

  contactCompany = '';
    customerContractDetailContractName = '';
    contractStatusStatusName = '';
    userName = '';

  totalCount: number = 0;
  projectList: any;

  // Create

  active = false;
  saving = false;

  customerContractDetail: CreateOrEditCustomerContractDetailDto = new CreateOrEditCustomerContractDetailDto();

  constructor(private _customerContractTemplateDetailService: CustomerContractTemplateDetailService, private _messageService: MessageService, private modalService: NgbModal , private _activatedRoute : ActivatedRoute ) {
  }

  ngOnInit() {

    this.breadCrumbItems = [{ label: 'Retainer' }, { label: 'ContractTemplate', active: true }];
    if (this.data) {
      this.customerContractDetail = this.data.customerContractDetail;
    }
    else {
      this.customerContractDetail = new CreateOrEditCustomerContractDetailDto();

    }
    this._activatedRoute.queryParams.subscribe(params => {
      this.customerContractDetail.customerContratTemplateId = Number(this._activatedRoute.snapshot.paramMap.get('contracttemplateid'));
      this.contracTemplateName = this._activatedRoute.snapshot.paramMap.get('contracttemplatename');
    });
  }




  //#region API Methods


  save() {
    this.showCreateEditLoader();
    if (this.customerContractDetail) {
      this._customerContractTemplateDetailService.createOrEdit(this.customerContractDetail).then(res => {
        if (res.success) {
          this.hideCreateEditLoader();
          this.$modalClose.emit(true);
        } else {
          this.hideCreateEditLoader();
          this._messageService.showError("Common.Title.Error", "Messages.ServerError");
        }
      });
    }

  }

  //#endregion


  //#region Helper Methods


  showCreateEditLoader() {
    this.createLoader = true;
  }

  hideCreateEditLoader() {
    this.createLoader = false;
  }

  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }

  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
  }

  //#endregion


}
