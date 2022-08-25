import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ButtonSettings, ColumnSetting, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { BusinessActionService } from 'src/app/core/services/business-action.service';
import { MessageService } from 'src/app/core/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-business-actions',
  templateUrl: './business-actions.component.html',
  styleUrls: ['./business-actions.component.scss']
})
export class BusinessActionsComponent implements OnInit {

  @Input() public isOpenForWorkflowTrigger: boolean = false;
  @Input() public businessWorkflowId: string = null;

  breadCrumbItems: Array<{}>;
  viewStatus: any;
  editStatus: any;
  loading = false;
  createLoader = false;
  advancedFiltersAreShown = false;
  filterText = '';
  maxDayNoFilter: number;
  maxDayNoFilterEmpty: number;
  minDayNoFilter: number;
  minDayNoFilterEmpty: number;
  contentScriptFilter = '';
  activeFilter = -1;
  titleFilter = '';
  maxWeekNoFilter: number;
  maxWeekNoFilterEmpty: number;
  minWeekNoFilter: number;
  minWeekNoFilterEmpty: number;
  actionTypeActionNameFilter = '';
  leadTemperatureTemperatureFilter = '';
  targetTitleTitleFilter = '';
  lawfirmServiceServicesNameFilter = '';
  serviceActivityActivityNameFilter = '';
  servicesActivityStepStepFilter = '';
  actionList: any;
  myData: any = [];

  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;

  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'xl'
  };

  tableSettings: ColumnSetting[];
  buttonSettings: ButtonSettings[] = [
    {
      title: 'View',
      func: (obj) => {
        this.viewStatus = obj;
        this.modalService.open(this.viewModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/Visual.png'
    },
    {
      title: 'Edit',
      func: (obj) => {
        this.editStatus = obj.businessActionScript;
        this.modalService.open(this.createModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/editIcon.png'
    },
    {
      title: 'Delete',
      func: (obj) => {
        this.onDelete(obj.businessActionScript.id);
      },
      icon: '../../../../assets/icons/deleteIcon.png'
    },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();

  constructor(private _messageService: MessageService,
    private modalService: NgbModal,
    private _businessActionService: BusinessActionService) {
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'BusinessActions' }, { label: 'BusinessActions', active: true }];
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
    this.setTableSettings();
  }

  setTableSettings() {
    if (!this.isOpenForWorkflowTrigger) {
      this.tableSettings = [
        {
          primaryKey: 'sr#',
          header: 'Sr#',
        },
        {
          primaryKey: 'actionTypeActionName',
          header: 'ActionName',
        },
        {
          primaryKey: 'leadTemperatureTemperature',
          header: 'Temperature',
        },
        {
          primaryKey: 'targetTitleTitle',
          header: 'Title',
        },
        {
          primaryKey: 'lawfirmServiceServicesName',
          header: 'ServicesName',
        },
        {
          primaryKey: 'serviceActivityActivityName',
          header: 'ActivityName',
        },
        {
          primaryKey: 'servicesActivityStepStep',
          header: 'Step',
        },
        {
          primaryKey: 'businessActionScript.dayNo',
          header: 'DayNo',
        },
        {
          primaryKey: 'businessActionScript.contentScript',
          header: 'ContentScript',
        },
        {
          primaryKey: 'businessActionScript.active',
          header: 'Active',
        },
        {
          primaryKey: 'businessActionScript.title',
          header: 'Title',
        },
        {
          primaryKey: 'businessActionScript.weekNo',
          header: 'WeekNo',
        }
      ];
    }
    else {
      this.tableSettings = [
      {
        primaryKey: 'sr#',
        header: 'Sr#',
        },
        {
          primaryKey: 'businessActionScript.dayNo',
          header: 'DayNo',
          },
      {
        primaryKey: 'businessActionScript.title',
        header: 'Title',
      },

      ]
    }
  }




  getRecords() {
    this.showLoader();
    this._businessActionService.getAll(
      this.filterText,
      this.maxDayNoFilter == null ? this.maxDayNoFilterEmpty : this.maxDayNoFilter,
      this.minDayNoFilter == null ? this.minDayNoFilterEmpty : this.minDayNoFilter,
      this.contentScriptFilter,
      this.activeFilter,
      this.titleFilter,
      this.maxWeekNoFilter == null ? this.maxWeekNoFilterEmpty : this.maxWeekNoFilter,
      this.minWeekNoFilter == null ? this.minWeekNoFilterEmpty : this.minWeekNoFilter,
      this.actionTypeActionNameFilter,
      this.leadTemperatureTemperatureFilter,
      this.targetTitleTitleFilter,
      this.lawfirmServiceServicesNameFilter,
      this.serviceActivityActivityNameFilter,
      this.servicesActivityStepStepFilter,
      this.businessWorkflowId,
      null,
      this.paginationSettings.pageIndex * this.paginationSettings.pageSize,
      this.paginationSettings.pageSize
    ).then(res => {
      this.hideLoader();
      if (res.success) {
        this.actionList = res.result.items;
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
    this.editStatus = null;
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
          this._businessActionService.delete(id)
            .then(res => {
              this.hideLoader();
              if (res.success) {
                this.getRecords();
                this._messageService.showSuccess('Deleted!', 'deleted successfully.');
              }
              else {
                this._messageService.showServerSideError();
              }
            });
        }
      });
  }


}
