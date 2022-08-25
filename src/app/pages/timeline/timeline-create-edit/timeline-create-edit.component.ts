import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateOrEditTestTypeTodoListDto, TestTodoListService } from 'src/app/core/services/test-todo-list.service';
import { environment } from 'src/environments/environment';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CreateOrEditContactActionsHistoryDto, TimelineService } from 'src/app/core/services/timeline.service';

@Component({
  selector: 'app-timeline-create-edit',
  templateUrl: './timeline-create-edit.component.html',
  styleUrls: ['./timeline-create-edit.component.scss']
})
export class TimelineCreateEditComponent implements OnInit {
  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  contactActionsHistory: CreateOrEditContactActionsHistoryDto = new CreateOrEditContactActionsHistoryDto();
  loading = false;
  createLoader = false;

  pmTaskTypes: DropdownDto[];
  testTypes: DropdownDto[];
  users: DropdownDto[];

  public description_editor = ClassicEditor;
  public comments_editor = ClassicEditor;

  isAttachment: boolean = false;
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  imageUrl: string = '';
  allActivityStages: any;
  allBusinessActions: any;
  allcontacts: any;
  allContacts: any;
  allUsers: any;

  constructor(private _timelineservice: TimelineService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.contactActionsHistory = this.data;
     
    }
    else {
      this.contactActionsHistory = new CreateOrEditContactActionsHistoryDto();
    }
    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      this._timelineservice.getAllActivityTaskStageForTableDropdown(),
      this._timelineservice.getAllBusinessActionScriptTableDropdown(),
      this._timelineservice.getAllContactForTableDropDown(),
      this._timelineservice.getAllUserForTableDropdown(),

    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.allActivityStages = data[0].result;
          this.allBusinessActions = data[1].result;
          this.allContacts = data[2].result;
          this.allUsers = data[3].result;
        }
        this.hideLoader();
      });
  }
  save(): void {
    this.showCreateEditLoader();
    if (this.contactActionsHistory) {
      this._timelineservice.createOrEdit(this.contactActionsHistory).then(res => {
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
  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
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
}
