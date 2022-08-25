import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateOrEditEpicDto } from 'src/app/core/models/Project/CreateOrEditEpic';
import { MessageService } from 'src/app/core/services/message.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-epic-view-modal',
  templateUrl: './epic-view-modal.component.html',
  styleUrls: ['./epic-view-modal.component.scss']
})
export class EpicViewModalComponent implements OnInit {

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



  constructor(private _projectService: ProjectService, private _messageService: MessageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Projects' }, { label: 'Projects View', active: true }];
    // this.loadDropDown();

    if (this.data) {
      this.item = this.data;
    }
    else {
      this.item = new CreateOrEditEpicDto();
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
