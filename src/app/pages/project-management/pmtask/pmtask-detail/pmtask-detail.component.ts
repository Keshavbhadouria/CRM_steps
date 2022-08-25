import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateOrEditPMtaskDto, PMtasksServiceProxy, TaskStageUpdateDto, UpdateResponsibleDto } from 'src/app/core/services/task.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TaskCommentService } from 'src/app/core/services/task-comment.service';
import { environment } from 'src/environments/environment';
import { ProjectTeamService } from 'src/app/core/services/project-team.service';
import { CreateOrEditPMTaskManualTrackingDto, PmTaskManualTrackingService } from 'src/app/core/services/pm-task-manual-tracking.service';
import { KeyConstant } from 'src/app/core/constants/KeyConstants';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-pmtask-detail',
  templateUrl: './pmtask-detail.component.html',
  styleUrls: ['./pmtask-detail.component.scss']
})

export class PmtaskDetailComponent implements OnInit {

  @Input() isModal: any;
  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @Output() $taskUpdated = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  @ViewChild('dueDate') dueDate: ElementRef;
  @ViewChild('viewImageModal') viewImageModal: ElementRef;

  baseUrl = environment.apiURL + "\\";

  pmTask: any;
  loading = false;
  createLoader = false;
  loadingDropdown = false;
  breadCrumbItems: Array<{}>;

  allPMProjects: any[];
  allPMSprints: any[];
  allPMStories: any[];
  allUsers: any[];
  allPMTaskPrioritys: any[];
  allPMTaskVelocities: any[];
  allPMTaskTypes: any[];
  allPMTaskFrequiencies: any[];
  commentAttachments = [];

  isOnlyLoadComment = false;
  projectMembers: any[];
  updateResponsibleDto = new UpdateResponsibleDto();
  taskStageUpdateDto = new TaskStageUpdateDto();
  //taskData;
  taskComments: any[];
  taskStages: any[];

  public Editor = ClassicEditor;
  taskComment = "";
  currentImgSrc: any;

  historyData: any[];
  displayMode = 'comment'; //comment.history
  isHistoryLoaded = false;
  trackTime: any;
  checkedTime: boolean = false;

  taskManualTracking: CreateOrEditPMTaskManualTrackingDto;
  isManualTrackingAllowed: boolean = false;
  hourValiMsg = '';
  minutesValiMsg = '';
  currentUserId: any;
  isEdit = false;
  editModel: any;
  distinctUserHisIds: any[];
  distinctUserIds: any;
  defaultProfilePic = '/assets/icons/default-user.png';

  constructor(@Inject(DOCUMENT) private document: Document, private _taskService: PMtasksServiceProxy,
    private _messageService: MessageService,
    private modalService: NgbModal,
    private taskCommentService: TaskCommentService,
    private _pmTeamMemberService: ProjectTeamService,
    private taskManualTrackService: PmTaskManualTrackingService,
    private _authService: AuthenticationService,
    private _profileService: ProfileService) { }

  ngOnInit(): void {
    this.editModel = { "id": 0 };

    this.currentUserId = this._authService.getLoggedInUser().userId;
    let userInfo = JSON.parse(localStorage.getItem(KeyConstant.userInfo) ?? '');
    this.isManualTrackingAllowed = userInfo === '' ? false : userInfo.isManualTrackingEnabled === undefined ? false : userInfo.isManualTrackingEnabled;

    if (this.isModal != 'no')
      this.document.body.classList.add('no-scroll');

    this.pmTask = this.data;

    this.loadTaskDetail();

    this.commentAttachments = [];
  }

  loadTaskDetail() {
    this.showLoader();
    const promises = [
      this.taskCommentService.getCommentsByTaskId(this.data.pMtask.id),
      this._taskService.getAllPMTaskStageDropDown()
    ];

    if (!this.isOnlyLoadComment)
      promises.push(this._taskService.getPMtaskForDetail(this.data.pMtask.id));

    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {


          this.taskComments = data[0].result;

          this.taskStages = data[1].result;

          if (!this.isOnlyLoadComment) {
            this.pmTask = data[2].result;
            this.loadResponsiblesData();
          }

          var commentUserIds = [];
          this.taskComments.forEach(function (x) {
            commentUserIds.push(x.commenttedBy)
          });
          var set = new Set(commentUserIds);
          this.distinctUserIds = [...set];
          this.getUserProfileByUserIds();
          this.isOnlyLoadComment = false;


        }
        this.hideLoader();
      });
  }

  loadResponsiblesData() {
    this.showLoader();

    const promises = [
      this._pmTeamMemberService.getAllForDropdownByProject(this.pmTask.pMtask.project),
    ];
    Promise.all(promises)
      .then(data => {
        this.projectMembers = this.bindListWithDefault(data[0].result)

        this.hideLoader();
      });
  }

  loadHistory() {
    this.displayMode = 'history';
    if (this.isHistoryLoaded) return;

    this.isHistoryLoaded = true;
    this.showLoader();
    this._taskService.getTaskHistory(this.data.pMtask.id).then(res => {
      if (res.success) {
        this.historyData = res.result;
        this.distinctUserHisIds = [];
        var historyUserIds = [];
        this.historyData.forEach(function (x) {
          if (x.creatorUserId != null)
            historyUserIds.push(x.creatorUserId)
        });
        var set = new Set(historyUserIds);
        this.distinctUserHisIds = [...set];
        this.getUserProfileByUserHisIds();

      } else {

      }
      this.hideLoader();
    });
  }

  responsibleChanged() {

    this.updateResponsibleDto.id = this.pmTask.pMtask.id;
    this.updateResponsibleDto.responsible = this.pmTask.pMtask.responsible;

    this._taskService.updateResponsible(this.updateResponsibleDto).then(res => {
      if (res.success) {
        this.$taskUpdated.emit();
      } else {

      }
    });
  }

  statusChanged() {
    this.taskStageUpdateDto.taskId = this.pmTask.pMtask.id;
    this.taskStageUpdateDto.stageId = this.pmTask.pMtask.pmTaskStageId;

    this._taskService.saveTaskStage(this.taskStageUpdateDto).then(res => {
      if (res.success) {
        this.$taskUpdated.emit();
      } else {

      }
    });
  }

  bindListWithDefault(source) {
    var items = [];
    items.push({ id: 0, displayName: "-Select-" });
    source.forEach(element => {
      items.push(element);
    });
    return items;
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

  closeModal() {
    this.document.body.classList.remove('no-scroll');
    this.modal.dismiss('Cross click')
  }

  addComment() {
    var data: any;
    if (this.isEdit) {
      data = {
        "comment": this.taskComment,
        "task": this.data.pMtask.id,
        "attachments": this.commentAttachments,
        "id": this.editModel.id
      }
    } else {
      data = {
        "comment": this.taskComment,
        "task": this.data.pMtask.id,
        "attachments": this.commentAttachments,
      };
    }

    this.isOnlyLoadComment = true;
    this.showLoader()
    this.taskCommentService.createOrEdit(data).then(result => {
      this.taskComment = "";
      this.isEdit = false;
      this.editModel = {};
      this.loadTaskDetail();
      this.commentAttachments = [];
      this.hideLoader()
    },
      (error) => {
        this.hideLoader();
      });
  }

  handleUpload(event) {

    const file = event.target.files[0];
    if (event.target.files[0].type.includes('image') || event.target.files[0].type.includes('pdf') || event.target.files[0].type.includes('xlx') || event.target.files[0].type.includes('xlsx')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.commentAttachments.push(reader.result.toString().substring(reader.result.toString().indexOf(',') + 1));
        this.myInputVariable.nativeElement.value = "";
      };
    }
    else {
      this.myInputVariable.nativeElement.value = "";
      this._messageService.showError("Common.Title.Error", "Messages.OnlyImagePDFExcelType");
    }
  }

  removeImage(index) {
    this.commentAttachments.splice(index, 1);
  }

  openImg(src) {
    this.currentImgSrc = src;
    if (src.includes('pdf') || src.includes('xlsx') || src.includes('xlx')) {
      window.open(src);
    }
    else
      this.modalService.open(this.viewImageModal, { size: 'xl' });
  }


  getSpendTime(id: number): void {
    this.showLoader();
    this._taskService.getTotalSpendTimeForTask(id).then(r => {
      if (r.success) {
        this.trackTime = r.result;
        this.checkedTime = true;
        this.hideLoader();
      }
      else {
        this.hideLoader();
      }
    }).catch(error => {
      this.hideLoader();
    });
  }

  //manual time tracking
  modalRef: any;
  openManualTimeTrackingModal(content): void {
    this.taskManualTracking = new CreateOrEditPMTaskManualTrackingDto();
    this.taskManualTracking.hours = 0;
    this.taskManualTracking.minutes = 0;
    this.taskManualTracking.pMtaskId = this.pmTask.pMtask.id;
    this.modalRef = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      size: 'md'
    });
  }

  saveManualTime(): void {
    this.showCreateEditLoader();
    this.taskManualTrackService.createOrEdit(this.taskManualTracking).then(res => {
      if (res.success) {
        this.hideCreateEditLoader();
        this.closeManualTimeModal();
      } else {
        this.hideCreateEditLoader();
      }
    });
  }

  closeManualTimeModal(): void {
    if (this.modalRef) {
      this.modalRef.dismiss();
    }
  }


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  checkHoursValue(currValue, maxValue: number, form: NgForm) {
    if (currValue === "") {
      this.hourValiMsg = "Required";
    }
    else if (parseInt(currValue) > maxValue) {
      this.hourValiMsg = `Hours can not be greater than ${maxValue}`;
      form.controls["hours"].setErrors({ 'incorrect': true });
    }
    else {
      form.controls["hours"].setErrors(null);
    }
  }
  checkMinutesValue(currValue, maxValue: number, form: NgForm) {
    if (currValue === "") {
      this.minutesValiMsg = "Required";
    }
    else if (parseInt(currValue) > maxValue) {
      this.minutesValiMsg = `Minutes can not be greater than ${maxValue}`;
      form.controls["minutes"].setErrors({ 'incorrect': true });
    }
    else {
      form.controls["minutes"].setErrors(null);
    }
  }
  updateDueDate(newDate: any, id: number): void {

    let updateDueDateObj = Object.assign({ id: id, dueDate: newDate }, null);
    this._taskService.updateDueDate(updateDueDateObj).then(res => {
      if (res.success) {

      } else {

      }
    });
  }
  removeCommentImage(attachmentId, commentId) {
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
          this.taskCommentService.DeleteCommentAttachment(commentId, attachmentId).then(res => {
            if (res.result) {
              this.loadTaskDetail();
              this._messageService.showSuccess("", "Comment Attachment Deleted Successfully");
            }
            this.hideLoader();
          });
        }
      });
  }
  clearComment() {
    this.isEdit = false;
    this.editModel = {};
    this.taskComment = "";
    this.commentAttachments = [];
  }
  onEditComment(commentObj) {
    this.editModel = commentObj;
    this.taskComment = commentObj.comment;
    this.isEdit = true;
  }
  onDeleteComment(commentObj) {
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
          this.taskCommentService.deleteComment(commentObj.id).then(res => {
            if (res.result) {
              this.loadTaskDetail();
              this._messageService.showSuccess("", "Comment Deleted Successfully");
            }
            this.hideLoader();
          });
        }
      });

  }
  getUserProfileByUserIds() {
    this.showLoader();
    this.distinctUserIds.forEach(x => {
      this._profileService.getProfilePictureByUser(x).then(res => {
        var filteredData = this.taskComments.filter((value) => {
          return value.commenttedBy == x;
        });
        filteredData.forEach(comment => {
          if (comment.commenttedBy == x) {
            if (res.result && res.result.profilePicture) {
              comment.profilePic = 'data:image/jpeg;base64,' + res.result.profilePicture;
            } else {
              comment.profilePic = '/assets/icons/default-user.png';
            }
          }
        });
        this.hideLoader();
      });
    });
  }
  getUserProfileByUserHisIds() {
    this.showLoader();
    this.distinctUserHisIds.forEach(x => {
      this._profileService.getProfilePictureByUser(x).then(res => {
        var filteredData = this.historyData.filter((value) => {
          return value.creatorUserId == x;
        });
        filteredData.forEach(history => {
          if (history.creatorUserId == x) {
            if (res.result && res.result.profilePicture) {
              history.profilePic = 'data:image/jpeg;base64,' + res.result.profilePicture;
            } else {
              history.profilePic = '/assets/icons/default-user.png';
            }
          }
        });
        this.hideLoader();
      });
    });
  }
}
