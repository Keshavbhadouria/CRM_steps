import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnSetting, ButtonSettings, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { MessageService } from 'src/app/core/services/message.service';
import { PMTaskPrioritiesServiceProxy } from 'src/app/core/services/task-priorities.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-priorities',
  templateUrl: './task-priorities.component.html',
  styleUrls: ['./task-priorities.component.scss']
})
export class TaskPrioritiesComponent implements OnInit {

  constructor(private _taskFrequenciesService: PMTaskPrioritiesServiceProxy,
    private _messageService: MessageService,
   public modalService: NgbModal) { }

   @ViewChild('viewModal') viewModal: ElementRef;
   @ViewChild('createModal') createModal: ElementRef;

   baseURL = environment.apiURL;

   loading = false;
 createLoader = false;
 breadCrumbItems: Array<{}>;

 advancedFiltersAreShown: boolean = false;
 filterText = '';
 statusFilter = '';

 editProject: any;
 viewProject: any;


 totalCount: number = 0;
 projectList: any;
 myData: any = [];

 // Create

 active = false;
 saving = false;

 //#region Table Configurations

 tableSettings: ColumnSetting[] = [
   {
     primaryKey: 'sr#',
     header: 'Sr#',
   },

   {
     primaryKey: 'priority',
     header: 'Priority',
   }
 ];

 buttonSettings: ButtonSettings[] = [
   {
     title: 'View',
     func: (obj) => {
       
       this.viewProject = obj;
       this.modalService.open(this.viewModal, { size: 'md' });
     },
     icon: '../../../../assets/icons/Visual.png'
   },
   {
     title: 'Edit',
     func: (obj) => {
       this.editProject = obj;
       this.modalService.open(this.createModal, { size: 'md' });
     },
     icon: '../../../../assets/icons/editIcon.png'
   },
   {
     title: 'Delete',
     func: (obj) => {
       
       this.onDelete(obj);
     },
     icon: '../../../../assets/icons/deleteIcon.png'
   },
 ];
 paginationSettings: PaginationSettings = new PaginationSettings();

 ngOnInit(): void {
   this.breadCrumbItems = [{ label: 'Tasks' }, { label: 'TaskPriorities', active: true }];
   this.paginationSettings.getRecords = () => this.getRecords();
   this.getRecords();
 }

 getRecords() {
   this.showLoader();
   this._taskFrequenciesService.getAll(
     this.filterText,
     this.statusFilter,
     null,
     this.paginationSettings.pageIndex * this.paginationSettings.pageSize,
     this.paginationSettings.pageSize
   ).then(res => {
     this.hideLoader();
     if (res.success) {
       this.projectList = res.result.items;
       this.myData = [];
       res.result.items.forEach(element => {
         this.myData.push(this.toArray(element));
       });
       this.paginationSettings.setPaginationData(res);
     } else {
       this._messageService.showServerSideError();
     }
   })
 }
 filterRecords() {
   this.paginationSettings.pageIndex = 0;
   this.getRecords();
 }

 onDelete(pmProjectStatus) {
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
         if (this.deleteProject(pmProjectStatus)) {
           swalWithBootstrapButtons.fire(
             'Deleted!',
             'Your file has been deleted.',
             'success'
           );
           this.myData = this.myData.filter(obj => { return obj !== pmProjectStatus });
         } else {
           this._messageService.showServerSideError();
         }
       }
     });
 }

 deleteProject(data): boolean {
   return this._taskFrequenciesService.delete(data.id).then(res => {
     if (res.success)
       return true;
     else
       return false;
   });
 }




 //#endregion


 //#region Helper Methods

 toArray(obj) {
   let data = Object.keys(obj).map(i => obj[i]);
   return data[0];
 }

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

 openCreateModal(modal: any) {
   this.editProject = null;
   this.modalService.open(modal, { size: 'md' });
 }

 closeCreateModal(reason?: any) {
   if (reason) {
     this.modalService.dismissAll(reason);
   } else {
     this.modalService.dismissAll();
   }
 }

 modalEmitEvent() {
   this.closeCreateModal();
this.paginationSettings.pageIndex = 0;
   this.getRecords();
 }


 onEditProject(item, modal) {
   this.editProject = item;
   this.modalService.open(modal, { size: 'md' });
 }

 onViewProject(item, modal) {
   this.viewProject = item;
   this.modalService.open(modal, { size: 'md' });
 }


}
