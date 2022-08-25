import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ButtonSettings, ColumnSetting, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { MessageService } from 'src/app/core/services/message.service';
import { TestTemplatesService } from 'src/app/core/services/test-templates.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-test-templates',
  templateUrl: './test-templates.component.html'
  //styleUrls: ['./test-templates.component.scss']
})
export class TestTemplatesComponent implements OnInit {

  constructor(private _messageService: MessageService,
    private modalService: NgbModal,
    private _testTypeTodoListTemplateService: TestTemplatesService) { }

  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;
  filterText: string = '';
  titleFilter: string = '';
  activeFilter: number = -1;
  testTypeTypeNameFilter: string = '';

  viewTestTypeTodoTemplate: any;
  editTestTypeTodoTemplate: any;
  loading = false;
  createLoader = false;

  totalCount: number = 0;
  testTypeTodoTemplateList: any;
  myData: any = [];

  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;

  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'xl'
  };

  //#region Table Configurations

  tableSettings: ColumnSetting[] = [
    {
      primaryKey: 'sr#',
      header: 'Sr#',
    },
    {
      primaryKey: 'testTypeTypeName',
      header: 'TypeName',
    },
    {
      primaryKey: 'testTypeTodoListTemplate.title',
      header: 'Title',
    },
    {
      primaryKey: 'testTypeTodoListTemplate.active',
      header: 'Active',
    }
  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'View',
      func: (obj) => {
        this.viewTestTypeTodoTemplate = obj;
        this.modalService.open(this.viewModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/Visual.png'
    },
    {
      title: 'Edit',
      func: (obj) => {
        this.editTestTypeTodoTemplate = obj.testTypeTodoListTemplate;
        this.modalService.open(this.createModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/editIcon.png'
    },
    {
      title: 'Delete',
      func: (obj) => {
        this.onDelete(obj.testTypeTodoListTemplate.id);
      },
      icon: '../../../../assets/icons/deleteIcon.png'
    },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  //#endregion

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Test Management' }, { label: 'Test Type Todo List Templates', active: true }];
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
  }
  getRecords() {
    this.showLoader();
    this._testTypeTodoListTemplateService.getAll(
      this.filterText,
      this.titleFilter,
      this.activeFilter,
      this.testTypeTypeNameFilter,
      null,
      this.paginationSettings.pageIndex * this.paginationSettings.pageSize,
      this.paginationSettings.pageSize
    ).then(res => {
      this.hideLoader();
      if (res.success) {
        this.testTypeTodoTemplateList = res.result.items;
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
    this.editTestTypeTodoTemplate = null;
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
          this._testTypeTodoListTemplateService.delete(id)
            .then(res => {
              this.hideLoader();
              if (res.success) {
                this.getRecords();
                this._messageService.showSuccess('Deleted!', 'Record deleted successfully.');
              }
              else {
                this._messageService.showServerSideError();
              }
            });
        }
      });
  }
}
