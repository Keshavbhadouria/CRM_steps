import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ButtonSettings, ColumnSetting, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { CampaignObjetivesServiceProxy } from 'src/app/core/services/campaign-objectives.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-campaign-objectives',
  templateUrl: './campaign-objectives.component.html',
  styleUrls: ['./campaign-objectives.component.scss']
})
export class CampaignObjectivesComponent implements OnInit {
  constructor(private _taskFrequenciesService: CampaignObjetivesServiceProxy,
    private _messageService: MessageService,
   public modalService: NgbModal,
   private translate: TranslateService) { }

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
     primaryKey: 'objetive',
     header: 'Objective',
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
   this.breadCrumbItems = [{ label: 'Marketing' }, { label: 'CanpaignObjectives', active: true }];
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
       confirmButton: this.translate.instant('confirmButtonMsg'),
       cancelButton: this.translate.instant('cancelButtonMsg')
     },
     buttonsStyling: false
   });

   swalWithBootstrapButtons
     .fire({
       title: this.translate.instant('Areyousure?'),
       text:  this.translate.instant('RevertMsg'),
       icon: this.translate.instant('warning'),
       confirmButtonText: this.translate.instant('confirmButtonTextMsg'),
       cancelButtonText: this.translate.instant('cancelButtonTextMsg'),
       showCancelButton: true
     })
     .then(result => {
       if (result.value) {
         if (this.deleteProject(pmProjectStatus)) {
           swalWithBootstrapButtons.fire(
             this.translate.instant('Deleted!'),
             this.translate.instant('Yourrecordhasbeendeleted.'),
             this.translate.instant('success')
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
