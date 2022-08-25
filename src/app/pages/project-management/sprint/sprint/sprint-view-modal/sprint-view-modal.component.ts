import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateOrEditPMSprintDto } from 'src/app/core/models/Project/Sprint';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sprint-view-modal',
  templateUrl: './sprint-view-modal.component.html',
  styleUrls: ['./sprint-view-modal.component.scss']
})
export class SprintViewModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;

  // bread crumb items
  loading = false;
  createLoader = false;
  loadingDropdown = false;
  breadCrumbItems: Array<{}>;
  baseURL = environment.apiURL;



  totalCount: number = 0;
  projectList: any;

  // Create

  active = false;
  saving = false;

  item: any;

  // allPMIndustrys: DropdownDto[];
  // allUsers: DropdownDto[];
  // allPMTaskPrioritys: DropdownDto[];
  // allepicObjStatuss: DropdownDto[];
  // allContact: DropdownDto[];



  constructor( private _messageService: MessageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Projects' }, { label: 'Projects View', active: true }];
    // this.loadDropDown();

    if (this.data) {
      this.item = this.data;
    }
    else {
      this.item = new CreateOrEditPMSprintDto();
    }
  }


  //#region API Methods

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
