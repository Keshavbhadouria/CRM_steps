import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateOrEditContractTemplateDetailDto } from 'src/app/core/models/Retainer/ContractTemplateDetail';
import { ContractTemplateDetailService } from 'src/app/core/services/contract-template-detail.service';

@Component({
  selector: 'app-contract-template-details-create-edit-modal',
  templateUrl: './contract-template-details-create-edit-modal.component.html',
  styleUrls: ['./contract-template-details-create-edit-modal.component.scss']
})
export class ContractTemplateDetailsCreateEditModalComponent implements OnInit {

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

  allLawfirmcontractTemplateDetails: DropdownDto[];
  allContactList: DropdownDto[];
  allUserList: DropdownDto[];
  allContractStatuss : DropdownDto[];


  contracTemplateName: string;

  contactCompany = '';
    contractTemplateDetailContractName = '';
    contractStatusStatusName = '';
    userName = '';

  totalCount: number = 0;
  projectList: any;

  // Create

  active = false;
  saving = false;

  contractTemplateDetail: CreateOrEditContractTemplateDetailDto = new CreateOrEditContractTemplateDetailDto();

  constructor(private _contractTemplateDetailService: ContractTemplateDetailService, private _messageService: MessageService, private modalService: NgbModal , private _activatedRoute : ActivatedRoute ) {
  }

  ngOnInit() {

    this.breadCrumbItems = [{ label: 'Retainer' }, { label: 'ContractTemplateDetail', active: true }];
    if (this.data) {
      this.contractTemplateDetail = this.data.contractTemplateDetail;
    }
    else {
      this.contractTemplateDetail = new CreateOrEditContractTemplateDetailDto();

    }
    this._activatedRoute.queryParams.subscribe(params => {
      this.contractTemplateDetail.contracTemplateNameId = this._activatedRoute.snapshot.paramMap.get('templateid');
      this.contracTemplateName = this._activatedRoute.snapshot.paramMap.get('templatename');
    });
  }




  //#region API Methods


  save() {
    this.showCreateEditLoader();
    if (this.contractTemplateDetail) {
      this._contractTemplateDetailService.createOrEdit(this.contractTemplateDetail).then(res => {
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
