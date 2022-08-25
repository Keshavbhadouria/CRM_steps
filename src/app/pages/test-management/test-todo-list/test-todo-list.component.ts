import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ButtonSettings, ColumnSetting, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { MessageService } from 'src/app/core/services/message.service';
import { TestTodoListService } from 'src/app/core/services/test-todo-list.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-test-todo-list',
  templateUrl: './test-todo-list.component.html'
  //styleUrls: ['./test-todo-list.component.scss']
})
export class TestTodoListComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;
  filterText: string = '';
  titleFilter: string = '';
  descriptionFilter: string = '';
  successFilter: number | null | undefined = -1;
  pMtaskTitleFilter: string = '';
  testTypeTypeNameFilter: string = '';
  userNameFilter: string = '';

  viewTestTypeTodo: any;
  editTestTypeTodo: any;
  loading = false;
  createLoader = false;

  totalCount: number = 0;
  testTypeTodoListList: any;
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
      primaryKey: 'pMtaskTitle',
      header: 'TaskTitle',
    },
    {
      primaryKey: 'testTypeTypeName',
      header: 'TypeName',
    },
    {
      primaryKey: 'userName',
      header: 'Username',
    },
    {
      primaryKey: 'testTypeTodoList.title',
      header: 'Title',
    },
    {
      primaryKey: 'testTypeTodoList.success',
      header: 'Success',
    },
  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'View',
      func: (obj) => {
        this.viewTestTypeTodo = obj;
        this.modalService.open(this.viewModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/Visual.png'
    },
    {
      title: 'Edit',
      func: (obj) => {
        this.editTestTypeTodo = obj.testTypeTodoList;
        this.modalService.open(this.createModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/editIcon.png'
    },
    {
      title: 'Delete',
      func: (obj) => {
        this.onDelete(obj.testTypeTodoList.id);
      },
      icon: '../../../../assets/icons/deleteIcon.png'
    },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  //#endregion

  constructor(private _messageService: MessageService,
    private modalService: NgbModal,
    private _testTypeTodoListService: TestTodoListService) { }


  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Test Management' }, { label: 'Test Type Todo List', active: true }];
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
  }
  getRecords() {
    this.showLoader();
    this._testTypeTodoListService.getAll(
      this.filterText,
      this.titleFilter,
      this.descriptionFilter,
      this.successFilter,
      this.pMtaskTitleFilter,
      this.testTypeTypeNameFilter,
      this.userNameFilter,
      null,
      this.paginationSettings.pageIndex * this.paginationSettings.pageSize,
      this.paginationSettings.pageSize
    ).then(res => {
      this.hideLoader();
      if (res.success) {
        this.testTypeTodoListList = res.result.items;
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
    this.editTestTypeTodo = null;
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
          this._testTypeTodoListService.delete(id)
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
