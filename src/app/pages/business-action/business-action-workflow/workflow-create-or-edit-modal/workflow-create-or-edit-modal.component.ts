import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateOrEditLeadWorkflowDto } from 'src/app/core/models/BusinessActionWorkflow/BusinessWorkflow';
import { BusinessActionWorkflowService } from 'src/app/core/services/business-action-workflow.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-workflow-create-or-edit-modal',
  templateUrl: './workflow-create-or-edit-modal.component.html',
  styleUrls: ['./workflow-create-or-edit-modal.component.scss']
})
export class WorkflowCreateOrEditModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('targetDate') targetDate: ElementRef;

  // bread crumb items
  loading = false;
  createLoader = false;
  loadingDropdown = false;
  breadCrumbItems: Array<{}>;



  totalCount: number = 0;
  projectList: any;

  allLeadStageList = [];

  // Create

  active = false;
  saving = false;

  businessWorkflow: CreateOrEditLeadWorkflowDto = new CreateOrEditLeadWorkflowDto();

  constructor(private _businessWorkflowService: BusinessActionWorkflowService, private _messageService: MessageService, private modalService: NgbModal) {

    this.loadDropDown();

   }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Business Action' }, { label: 'Create Business Action Workflow', active: true }];
    
    if (this.data) {
      this.businessWorkflow = this.data.leadWorkflow;
    }
    else {
      this.businessWorkflow = new CreateOrEditLeadWorkflowDto();
    }
  }


  //#region API Methods


  save() {
    this.showCreateEditLoader();
    if (this.businessWorkflow) {
      this._businessWorkflowService.createOrEdit(this.businessWorkflow).then(res => {
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


  loadDropDown() {
    this.showLoader();
    const promises = [
      this._businessWorkflowService.getAllLeadStageForLookupTable(null,null,0,2000),
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.allLeadStageList = data[0].result.items;
        }
        this.hideLoader();
      });
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
