import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnSetting, ButtonSettings, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { BusinessActionWorkflowService } from 'src/app/core/services/business-action-workflow.service';
import { MessageService } from 'src/app/core/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-business-action-triggers',
  templateUrl: './business-action-triggers.component.html',
  styleUrls: ['./business-action-triggers.component.scss']
})
export class BusinessActionTriggersComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;
  filterText = '';
  workflowNameFilter = '';
  leadStageStageNameFilter = '';

  isOpen = false;

  view: any;
  edit: any;
  loading = false;
  createLoader = false;

  totalCount: number = 0;
  list: any;
  myData: any = [];

  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;

  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'md'
  };

  //#region Table Configurations

  tableSettings: ColumnSetting[] = [
    {
      primaryKey: 'sr#',
      header: 'Sr#',
    },
    {
      primaryKey: 'leadStageStageName',
      header: 'Stage Name',
    },
    {
      primaryKey: 'leadWorkflow.workflowName',
      header: 'Workflow Name',
    }
  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'View',
      func: (obj) => {
        this.view = obj;
        this.modalService.open(this.viewModal, { size: 'xl' });
      },
      icon: '../../../../assets/icons/Visual.png'
    },
    {
      title: 'Edit',
      func: (obj) => {
        this.edit = obj;
        this.modalService.open(this.createModal, { size: 'xl' });
      },
      icon: '../../../../assets/icons/editIcon.png'
    },
    {
      title: 'Delete',
      func: (obj) => {
        this.onDelete(obj.leadWorkflow.id);
      },
      icon: '../../../../assets/icons/deleteIcon.png'
    },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  //#endregion
  constructor(private _messageService: MessageService,
    private modalService: NgbModal,
    private _businessWorkflowService: BusinessActionWorkflowService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Business Action' }, { label: 'Triggers', active: true }];
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
  }



  togglebody(item) {
    this.myData.forEach(x => {
      if (x.leadWorkflow.id != item.leadWorkflow.id) {
        x.leadWorkflow.isSelected = false
      }
      else {
        x.leadWorkflow.isSelected = !(x.leadWorkflow.isSelected)
      }
    });
  }

  getRecords() {
    this.showLoader();
    this._businessWorkflowService.getAll(
      this.filterText,
      this.workflowNameFilter,
      this.leadStageStageNameFilter,
      null,
      0,
      2000
    ).then(res => {
      this.hideLoader();
      if (res.success) {

        this.list = res.result.items;
        this.myData = [];
        this.myData = res.result.items;
        this.paginationSettings.setPaginationData(res);
      } else {
        this._messageService.showServerSideError();
      }
    })
  }
  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }
  filterRecords() {
    this.paginationSettings.pageIndex = 0;
    this.getRecords();
  }

  openCreateModal(modal: any) {
    this.edit = null;
    this.modalService.open(modal, this.ngbModalOptions);
  }

  modalEmitEvent() {
    this.closeCreateModal();
this.paginationSettings.pageIndex = 0;
    this.getRecords();
  }

  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
  }

  onDelete(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          this.showLoader();
          this._businessWorkflowService.delete(id)
            .then(res => {
              this.hideLoader();
              if (res.success) {
                this.getRecords();
                this._messageService.showSuccess('Deleted!', 'Record Deleted Successfully.') ;
              }
              else {
                this._messageService.showServerSideError();
              }
            });
        }
      });
  }
}
