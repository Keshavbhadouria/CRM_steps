import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/core/services/message.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CreateOrEditEpicDto } from 'src/app/core/models/Project/CreateOrEditEpic';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { EpicService } from 'src/app/core/services/epic.service';

@Component({
  selector: 'app-epic-create-edit-modal',
  templateUrl: './epic-create-edit-modal.component.html',
  styleUrls: ['./epic-create-edit-modal.component.scss']
})
export class EpicCreateEditModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any
  @Input() public projectId: any
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

  // Create

  active = false;
  saving = false;

  epic: CreateOrEditEpicDto = new CreateOrEditEpicDto();

  allEpicStatus: DropdownDto[];
  allEpicProjects: DropdownDto[];
  allContact: DropdownDto[];
  public Editor = ClassicEditor;



  constructor(private _EpicService: EpicService, private _messageService: MessageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Epic' }, { label: 'Epic', active: true }];
    this.loadDropDown();
    if (this.data) {
      this.epic = this.data.epic;
    }
    else {
      this.epic = new CreateOrEditEpicDto();
      this.epic.pmProjectId=this.projectId;
    }
  }


  //#region API Methods




  save() {
    this.showCreateEditLoader();
    if (this.epic) {
      this._EpicService.createOrEdit(this.epic).then(res => {
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

  loadDropDown() {
    this.showLoader();
    const promises = [
      this._EpicService.getAllPMEpicStatusForTableDropdown(),
      this._EpicService.getAllPMProjectForLookupTable(null,null,0,2000),
      this._EpicService.getAllContactForLookupTable(null, null, 0, 2000),
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.allEpicStatus = data[0].result;
          this.allEpicProjects = data[1].result.items;
          this.allContact = data[2].result.items;
          
        }
        this.hideLoader();
      });
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
