import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BugsService, BugStatusUpdateDto, UpdateResponsibleDto } from 'src/app/core/services/bugs.service';
import { MessageService } from 'src/app/core/services/message.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { environment } from 'src/environments/environment';
import { ProjectTeamService } from 'src/app/core/services/project-team.service';
import { CreateOrEditTaskBugManualTrackingDto, TaskBugManualTrackingService } from 'src/app/core/services/task-bug-manual-tracking.service';
import { KeyConstant } from 'src/app/core/constants/KeyConstants';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';
import { ProfileService } from 'src/app/core/services/profile.service';
@Component({
  selector: 'app-bug-detail-modal',
  templateUrl: './bug-detail-modal.component.html',
  styleUrls: ['./bug-detail-modal.component.scss']
})
export class BugDetailModalComponent implements OnInit {
  currentUserId: any;
  distinctUserHisIds: any;
  distinctUserIds: any;


  constructor(@Inject(DOCUMENT) private document: Document,
    private _messageService: MessageService,
    private modalService: NgbModal,
    private _taskBugService: BugsService,
    private _pmTeamMemberService: ProjectTeamService,
    private _taskBugManualTrackService: TaskBugManualTrackingService,
    private _authService: AuthenticationService,
    private _profileService: ProfileService) { }

  baseUrl = environment.apiURL + "\\";

  taskBug: any;
  @Input() isModal: any;
  @Input() public modal: any
  @Input() public data: any;
  @Output() $bugUpdated = new EventEmitter();

  @ViewChild('myInputFile') myInputVariable: ElementRef;
  @ViewChild('viewImageModal') viewImageModal: ElementRef;

  public Editor = ClassicEditor;
  defaultProfilePic = '/assets/icons/default-user.png';

  bugComments = [];
  bugComment;
  loading = false;
  isOnlyLoadComment = false;
  commentAttachments = [];
  currentImgSrc;
  projectMembers: any
  updateResponsibleDto = new UpdateResponsibleDto();
  bugStatusUpdateDto = new BugStatusUpdateDto();
  bugStatuses: any[];

  historyData: any[];
  displayMode = 'comment';//comment,history
  isHistoryLoaded = false;

  trackTime: any;
  checkedTime: boolean = false;

  taskBugManualTracking: CreateOrEditTaskBugManualTrackingDto;
  createLoader = false;

  isManualTrackingAllowed: boolean = false;

  hourValiMsg = '';
  minutesValiMsg = '';
  isEdit=false;
  editModel:any;

  ngOnInit(): void {
    this.editModel={"id":0};
    this.currentUserId = this._authService.getLoggedInUser().userId;
    let userInfo = JSON.parse(localStorage.getItem(KeyConstant.userInfo) ?? '');
    this.isManualTrackingAllowed = userInfo === '' ? false : userInfo.isManualTrackingEnabled === undefined ? false : userInfo.isManualTrackingEnabled;

    this.bugComment = "";
    if(this.isModal != "no")
      this.document.body.classList.add('no-scroll');

    this.taskBug = this.data;

    this.loadBugDetail();

    this.commentAttachments = [];
  }

  loadBugDetail() {
    this.showLoader();
    const promises = [
      this._taskBugService.getCommentsByBugId(this.data.taskBug.id),
      this._taskBugService.getAllBugStatusForTableDropdown()
    ];

    if (!this.isOnlyLoadComment)
      promises.push(this._taskBugService.GetTaskBugForView(this.data.taskBug.id));

    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.bugComments = data[0].result;
          this.bugStatuses = data[1].result;

          if (!this.isOnlyLoadComment)
            this.taskBug = data[2].result;

            var commentUserIds = [];
            this.bugComments.forEach(function (x) {
              commentUserIds.push(x.addedBy)
            });
            var set = new Set(commentUserIds);
            this.distinctUserIds = [...set];
            this.getUserProfileByUserIds();
          this.isOnlyLoadComment = false;

          this.loadResponsiblesData();
        }
        this.hideLoader();
      });
  }

  loadResponsiblesData() {
    this.showLoader();

    const promises = [
      this._pmTeamMemberService.getAllForDropdownByProject(this.taskBug.taskBug.project),
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
    this._taskBugService.getBugHistory(this.data.taskBug.id).then(res => {
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

    this.updateResponsibleDto.id = this.taskBug.taskBug.id;
    this.updateResponsibleDto.responsible = this.taskBug.taskBug.responsible;

    this._taskBugService.updateResponsible(this.updateResponsibleDto).then(res => {
      if (res.success) {
        this.$bugUpdated.emit();
      } else {

      }
    });
  }

  statusChanged() {
    this.bugStatusUpdateDto.bugId = this.taskBug.taskBug.id;
    this.bugStatusUpdateDto.statusId = this.taskBug.taskBug.bugStatus;

    this._taskBugService.saveBugStatus(this.bugStatusUpdateDto).then(res => {
      if (res.success) {
        this.$bugUpdated.emit();
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

    var data:any;
    
    if(this.isEdit){
      data={
        "comment": this.bugComment,
        "bug": this.data.taskBug.id,
        "attachments": this.commentAttachments,
        "id":this.editModel.id
      }
    }else{
      data = {
        "comment": this.bugComment,
        "bug": this.data.taskBug.id,
        "attachments": this.commentAttachments
      };
    }
    this.isOnlyLoadComment = true;
    this._taskBugService.createOrEditComment(data).then(result => {
      this.isEdit=false;
      this.editModel={};
      this.bugComment = "";
      this.loadBugDetail();
      this.commentAttachments = [];
    });
  }

  handleUpload(event) {

    const file = event.target.files[0];
    if (event.target.files[0].type.includes('image')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.commentAttachments.push(reader.result.toString().substring(reader.result.toString().indexOf(',') + 1));
        this.myInputVariable.nativeElement.value = "";
      };
    }
    else {
      this.myInputVariable.nativeElement.value = "";
      this._messageService.showError("Common.Title.Error", "Messages.OnlyImageType");
    }
  }

  removeImage(index) {
    this.commentAttachments.splice(index, 1);
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
          this._taskBugService.DeleteCommentAttachment(commentId, attachmentId).then(res => {
            if (res.result) {
              this.loadBugDetail();
              this._messageService.showSuccess("", "Comment Attachment Deleted Successfully");
            }
            this.hideLoader();
          });
        }
      });
  }

  clearComment(){
    this.isEdit=false;
    this.editModel={};
    this.bugComment="";
    this.commentAttachments = [];
  }

  onEditComment(commentObj) {
    
    this.editModel = commentObj;
    this.bugComment = commentObj.comment;
    this.isEdit=true;
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
          this._taskBugService.deleteComment(commentObj.id).then(res => {
            if (res.result) {
              this.loadBugDetail();
              this._messageService.showSuccess("", "Comment Deleted Successfully");
            }
            this.hideLoader();
          });
        }
      });
  }



  openImg(src) {
    this.currentImgSrc = src;
    this.modalService.open(this.viewImageModal, { size: 'xl' });
  }

  getSpendTime(id: number): void {
    this.showLoader();
    this._taskBugService.getTotalSpendTimeForTaskBug(id).then(r => {
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

  modalRef: any;
  openManualTimeTrackingModal(content): void {
    this.taskBugManualTracking = new CreateOrEditTaskBugManualTrackingDto();
    this.taskBugManualTracking.hours = 0;
    this.taskBugManualTracking.minutes = 0;
    this.taskBugManualTracking.taskBugId = this.taskBug.taskBug.id;
    this.modalRef = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      size: 'md'
    });
  }

  saveManualTime(): void {
    this.showCreateEditLoader();
    this._taskBugManualTrackService.createOrEdit(this.taskBugManualTracking).then(res => {
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

  showCreateEditLoader() {
    this.createLoader = true;
  }

  hideCreateEditLoader() {
    this.createLoader = false;
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
      this.hourValiMsg = 'Hours can not be greater than 50';
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
      this.minutesValiMsg = 'Minutes can not be greater than 60';
      form.controls["minutes"].setErrors({ 'incorrect': true });
    }
    else {
      form.controls["minutes"].setErrors(null);
    }
  }
  updateDueDate(newDate: any, id: number): void {

    let updateDueDateObj = Object.assign({ id: id, dueDate: newDate }, null);
    this._taskBugService.updateDueDate(updateDueDateObj).then(res => {
      if (res.success) {

      } else {

      }
    });
  }
  getUserProfileByUserIds() {
    this.showLoader();
    this.distinctUserIds.forEach(x => {
      var filteredData =  this.bugComments.filter((value) => {
        return value.addedBy == x;
      });
      this._profileService.getProfilePictureByUser(x).then(res => {
      
        filteredData.forEach(comment => {
          if (comment.addedBy == x) {
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
      var filteredData =  this.historyData.filter((value) => {
        return value.creatorUserId == x;
      });
      this._profileService.getProfilePictureByUser(x).then(res => {
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
