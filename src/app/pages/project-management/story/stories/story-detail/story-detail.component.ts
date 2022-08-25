import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CreateOrEditPMStoryDto, StoriesService, StoryStatusUpdateDto, UpdateResponsibleDto } from 'src/app/core/services/stories.service';
import { StoryCommentService } from 'src/app/core/services/story-comment.service';
import { environment } from 'src/environments/environment';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/core/services/message.service';
import { ProjectTeamService } from 'src/app/core/services/project-team.service';
import { CreateOrEditPMStoryManualTrackingDto, PmStoryManualTrackingService } from 'src/app/core/services/pm-story-manual-tracking.service';
import { KeyConstant } from 'src/app/core/constants/KeyConstants';
import { emitKeypressEvents } from 'readline';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.component.html',
  styleUrls: ['./story-detail.component.scss']
})
export class StoryDetailComponent implements OnInit {
  currentUserId: any;
  distinctUserHisIds: any[];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private _storiesService: StoriesService,
    private storyCommentService: StoryCommentService,
    private modalService: NgbModal,
    private _messageService: MessageService,
    private _pmTeamMemberService: ProjectTeamService,
    private _pmStoryManualTrackService: PmStoryManualTrackingService,
    private _changeDetector: ChangeDetectorRef,
    private _authService: AuthenticationService,
    private _profileService: ProfileService) { }

  story: any;
  @Input() isModal:any;
  @Input() public modal: any
  @Input() public data: any;
  @Output() $storyUpdated = new EventEmitter();

  @ViewChild('myInputFile') myInputVariable: ElementRef;
  @ViewChild('viewImageModal') viewImageModal: ElementRef;

  defaultProfilePic = '/assets/icons/default-user.png';
  breadCrumbItems: any[];
  commentAttachments: any[];
  loading = false;
  isOnlyLoadComment = false;
  storyComments: any[];
  statuses: any[];
  storyComment = "";
  currentImgSrc: any;

  baseUrl = environment.apiURL + "\\";

  public Editor = ClassicEditor;

  projectMembers: any[];
  updateResponsibleDto = new UpdateResponsibleDto();
  storyStatusUpdateDto = new StoryStatusUpdateDto();

  displayMode = "comment"; //comment,history
  historyData: any[];
  isHistoryLoaded = false;

  trackTime: any;
  checkedTime: boolean = false;

  storyManualTracking: CreateOrEditPMStoryManualTrackingDto;
  createLoader = false;
  isManualTrackingAllowed: boolean = false;

  hourValiMsg = '';
  minutesValiMsg = '';
  isEdit = false;
  editModel: any;
  distinctUserIds = [];

  ngOnInit(): void {
    this.editModel = { "id": 0 };

    let userInfo = JSON.parse(localStorage.getItem(KeyConstant.userInfo) ?? '');
    this.currentUserId = this._authService.getLoggedInUser().userId;
    this.isManualTrackingAllowed = userInfo === '' ? false : userInfo.isManualTrackingEnabled === undefined ? false : userInfo.isManualTrackingEnabled;
    if(this.isModal != 'no')
      this.document.body.classList.add('no-scroll');

    this.breadCrumbItems = [{ label: 'Tasks' }, { label: 'Task View', active: true }];

    if (this.data) {
      this.story = this.data;
    }
    else {
      this.story = new CreateOrEditPMStoryDto();
    }

    this.loadStoryDetail();

    this.commentAttachments = [];

  }

  loadStoryDetail() {
    this.showLoader();
    const promises = [
      this.storyCommentService.getCommentsByStoryId(this.data.pmStory.id),
      this._storiesService.getAllPMStoryStatusForTableDropdown()
    ];

    if (!this.isOnlyLoadComment)
      promises.push(this._storiesService.getPMStoryForEdit(this.data.pmStory.id));

    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          debugger
          this.storyComments = data[0].result;
          this.statuses = data[1].result;

          if (!this.isOnlyLoadComment) {
            this.story = data[2].result;
            this.loadResponsiblesData()
          }
          var commentUserIds = [];
          this.storyComments.forEach(function (x) {
            commentUserIds.push(x.createdBy)
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
      this._pmTeamMemberService.getAllForDropdownByProject(this.story.pmStory.pmProjectId),
    ];
    Promise.all(promises)
      .then(data => {
        this.projectMembers = this.bindListWithDefault(data[0].result)

        this.hideLoader();
      });
  }

  responsibleChanged() {

    this.updateResponsibleDto.id = this.story.pmStory.id;
    this.updateResponsibleDto.responsible = this.story.pmStory.initialResponsible;

    this._storiesService.updateResponsible(this.updateResponsibleDto).then(res => {
      if (res.success) {
        this.$storyUpdated.emit();
      } else {

      }
    });
  }

  statusChanged() {

    this.storyStatusUpdateDto.storyId = this.story.pmStory.id;
    this.storyStatusUpdateDto.statusId = this.story.pmStory.pmStoryStatusId;

    this._storiesService.saveStoryStatus(this.storyStatusUpdateDto).then(res => {
      if (res.success) {
        this.$storyUpdated.emit();
      } else {

      }
    });
  }

  loadHistory() {
    this.displayMode = 'history';
    if (this.isHistoryLoaded) return;

    this.isHistoryLoaded = true;
    this.showLoader();
    this._storiesService.getStoryHistory(this.data.pmStory.id).then(res => {
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
    var data: any;
    if (this.isEdit) {
      data = {
        "comment": this.storyComment,
        "pmStoryId": this.data.pmStory.id,
        "attachments": this.commentAttachments,
        "id": this.editModel.id
      }
    } else {
      data = {
        "comment": this.storyComment,
        "pmStoryId": this.data.pmStory.id,
        "attachments": this.commentAttachments,
      };
    }

    this.isOnlyLoadComment = true;
    this.showLoader();
    this.storyCommentService.createOrEdit(data).then(result => {
      this.storyComment = "";
      this.isEdit = false;
      this.editModel = {};
      this.loadStoryDetail();
      this.commentAttachments = [];
      this.hideLoader();
    });
  }

  handleUpload(event) {
    const file = event.target.files[0];
    if (event.target.files[0].type.includes('image') || event.target.files[0].type.includes('pdf') || event.target.files[0].type.includes('xlx') || event.target.files[0].type.includes('xlsx') ) {
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
    this._storiesService.getTotalSpendTimeForStory(id).then(r => {
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
    this.storyManualTracking = new CreateOrEditPMStoryManualTrackingDto();
    this.storyManualTracking.hours = 0;
    this.storyManualTracking.minutes = 0;
    this.storyManualTracking.pmStoryId = this.story.pmStory.id;
    this.modalRef = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      size: 'md'
    });
  }

  saveManualTime(): void {

    this.showCreateEditLoader();
    this._pmStoryManualTrackService.createOrEdit(this.storyManualTracking).then(res => {
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
    this._storiesService.updateDueDate(updateDueDateObj).then(res => {
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
          this.storyCommentService.DeleteCommentAttachment(commentId, attachmentId).then(res => {
            if (res.result) {
              this.loadStoryDetail();
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
    this.storyComment = "";
    this.commentAttachments = [];
  }
  onEditComment(commentObj) {
    this.editModel = commentObj;
    this.storyComment = commentObj.comment;
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
          this.storyCommentService.deleteComment(commentObj.id).then(res => {
            if (res.result) {
              this.loadStoryDetail();
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
       var filteredData =  this.storyComments.filter((value) => {
          return value.createdBy == x;
        });
        filteredData.forEach(comment => {
          if (comment.createdBy == x) {
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
        var filteredData =  this.historyData.filter((value) => {
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
