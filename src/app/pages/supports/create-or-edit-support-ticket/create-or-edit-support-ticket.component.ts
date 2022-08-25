import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { CreateOrEditSupportDto, SupportsService } from 'src/app/core/services/supports.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateOrEditSupportTicketCommentDto, SupportCommentService } from 'src/app/core/services/support-comment.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { $ } from 'protractor';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-or-edit-support-ticket',
  templateUrl: './create-or-edit-support-ticket.component.html',
  styleUrls: ['./create-or-edit-support-ticket.component.scss']
})
export class CreateOrEditSupportTicketComponent implements OnInit {
  saving = false;
  issavingType = '';
  supportTicket: CreateOrEditSupportDto = new CreateOrEditSupportDto();
  supportTicketStatusStatusName = '';
  image: string = '';
  currTicketId: string = '';
  @ViewChild('fileInputUpd') myInputVariable: ElementRef;

  allSupportTicketStatuss: DropdownDto[];

  public editor = ClassicEditor;

  images: any[] = [];
  attachments: any[] = [];
  isAnyComments: boolean = false;
  fileInput = null;
  isShowTicketForm: boolean = false;
  isShowCommentAndBtns: boolean = true;
  ticketComment: any = "";
  commentAttachments: any[] = [];
  commentFileInput: any = '';
  showUpdateTicket: boolean = false;
  isSupportAdmin: boolean = true;
  currentUserId = 0;
  currentUserImageString: string = "";
  isNotImage = false;
  supportTicketStatus: string = "";
  selectActionBlankValue: string = "";
  hasAnyText = false;
  emailInput: any = "";
  selectInput = '';
  lastStatusModificationTime: any = '';
  contactUserId: number;

  previousTickets: number[] = [];
  nextTickets: number[] = [];
  currentId: number;

  constructor(private _activatedRoute: ActivatedRoute,
    private _supportsService: SupportsService,
    private _router: Router,
    private _messageService: MessageService,
    private _supportCommentService: SupportCommentService,
    private _authService: AuthenticationService,
    private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.currentUserId = this._authService.getLoggedInUser().userId;
    if (this.supportTicket.comments === undefined || this.supportTicket.comments.length === 0) {
      this.supportTicket.comments = [];
    }

    this.currTicketId = this._activatedRoute.snapshot.paramMap.get('id');
    this._supportsService.getAllHelpDeskStatusForTableDropdown().then(result => {
      this.allSupportTicketStatuss = result.result;
    });

    this._supportsService.getSupportForEdit(this.currTicketId).then(result => {
      this.supportTicket = result.result.support;
      this.supportTicketStatusStatusName = result.result.helpDeskStatusStatusName;
      if (this.supportTicket.attatchmentUrl !== null && this.supportTicket.attatchmentUrl !== undefined) {
        this.image = this.supportTicket.attatchmentUrl;
      }

      this._supportCommentService.getBySupportId(this.currTicketId).then(result => {
        var response = result.result;

        if (this.supportTicket.comments === undefined || this.supportTicket.comments.length === 0) {
          this.supportTicket.comments = [];
        }

        for (var comment of response) {
          if (comment.supportTicketComment.attatchmentUrl === null) {
            comment.supportTicketComment.attatchmentUrl = '';
          }
          else if(comment.supportTicketComment.attatchmentUrl.length > 0){
            comment.supportTicketComment.attatchmentUrl = environment.apiURL + "/" + comment.supportTicketComment.attatchmentUrl
          }

          if (comment.supportTicketComment.userImageBlob === undefined) {
            comment.supportTicketComment.userImageBlob = '';
          }

          comment.supportTicketComment.userName = comment.userName;
          comment.supportTicketComment.createdDate = formatDate(comment.supportTicketComment.creationTime, 'MMM d, y, h:mm:ss a', 'en-US');
          this.supportTicket.comments.push(comment.supportTicketComment);
        }
        console.log(this.supportTicket.comments);
        this.loadImages();
      });
    });


  }

  // ngAfterViewInit(){
  //   this.changeDetector.detectChanges();
  // }

  getBase64File(filename: any) {
    if(filename !== undefined && filename !== null && filename.indexOf("data:") > -1){
      return true;
    }
    else return false;
  }

  getExtension(filename: any) {
    return filename.split('.').pop();
  }

  getFileImgExt(file: File): string {
    var fileName = file.name.replace(/^.*[\\\/]/, '');
    var extension = this.getExtension(fileName);
    return extension;
  }

  downloadAttachment(imageUrl: string): void {
    var link = document.createElement('a');
    link.href = imageUrl;
    link.target = "_blank";
    link.click();
  }

  back() {
    this._router.navigate(['helpdesk/supports']);
  }

  selectAction(event) {

  }

  enableDisableInput(): void {
    if (this.ticketComment != null && this.ticketComment.length > 0) {
      this.hasAnyText = true;
    }
    else {
      this.hasAnyText = false;
    }
  }

  onSelectedFile(args) {
    this.images = [];
    let isImage = true;
    const files = args.target.files;
    //TODO - Convert images to base 64 and create Images object and upload to api
    if (args.target.files.length > 0) {
      for (let index = 0; index < files.length; index++) {
        // if (files.item(index).type.match('image.*')) {
        var reader = new FileReader();
        reader.readAsDataURL(files[index]);
        var currFile = files[index];
        var fileSize = Math.round((currFile.size / 1024));
        var fileType = this.getExtension(files[index].name);

        if (fileType.toLowerCase() == "png" ||
          fileType.toLowerCase() == 'jpg' ||
          fileType.toLowerCase() == "jpeg" ||
          fileType.toLowerCase() == "doc" ||
          fileType.toLowerCase() == "docx" ||
          fileType.toLowerCase() == "pdf" ||
          fileType.toLowerCase() == "xls" ||
          fileType.toLowerCase() == "xlsx") {


        }
        else {
          isImage = false;
          this._messageService.showError("SupportTicketFileTypeTitleErrorMsg", "SupportTicketFileTypeErrorMsg");
          args.target.value = null;
          return false;
        }
        if (fileType.toLowerCase() == "doc" ||
          fileType.toLowerCase() == "docx" ||
          fileType.toLowerCase() == "pdf" ||
          fileType.toLowerCase() == "xls" ||
          fileType.toLowerCase() == "xlsx") {
          this.isNotImage = true;
        }
        else {
          this.isNotImage = false;
        }

        if (fileSize >= 3072) {
          isImage = false;
          this._messageService.showError("SupportTicketFileSizeTitleErrorMsg", "SupportTicketFileSizeErrorMsg");
          args.target.value = null;
          return false;
        }

        reader.onload = (_event) => {
          currFile.url = _event.target.result;
        }
        this.images.push(currFile);
      }
    }
  }

  removeImage(index: number, element) {
    this.images.splice(index, 1);
    element.value = "";
  }

  reply() {

    var comment = new CreateOrEditSupportTicketCommentDto();
    
    comment.comment = this.ticketComment;
    comment.supportId = this.currTicketId;
    comment.userId = this._authService.getLoggedInUser().userId;
    comment.userName = this._authService.getLoggedInUser().firstName;
    comment.userImageBlob = '';
    comment.createdDate = formatDate(new Date(), 'MMM d, y, h:mm:ss a', 'en-US');
    if (this.images.length > 0) {
      comment.attatchmentUrl = this.images[0].url;
    }

    this._supportCommentService.createOrEdit(comment).then(result => {
      if (this.supportTicket.comments === undefined || this.supportTicket.comments.length === 0)
        this.supportTicket.comments = [];

      this.supportTicket.comments.push(comment);
      this.ticketComment = '';
      this.myInputVariable.nativeElement.value = "";
      this.images = [];
      this.hasAnyText = false;
      console.log(this.supportTicket.comments);
    });
  }

  loadImages(): void {
    var arrayWithDuplicates = this.supportTicket.comments.map(s => s.userId);
    const userIds = arrayWithDuplicates.filter((n, i) => arrayWithDuplicates.indexOf(n) === i);
    userIds.forEach(s => {
      this._supportsService.loadUserImage(s).then(result => {
        var selectedUserComments = this.supportTicket.comments.filter((x, i) => x.userId === s);
        if (result.result.profilePicture) {
          selectedUserComments.forEach(comment => {
            comment.userImageBlob = 'data:image/jpeg;base64,' + result.result.profilePicture;
          });
        }
      })
    })

  }

  mergeTickets(): void {

  }

  openNextTicket(a) {

  }
  openPreviousTicket(a) {

  }
  DeleteTicket() {

  }
  EditRecord() {

  }
  save() {

  }

  updateTicket() {
    this._supportsService.createOrEdit(this.supportTicket).then(() => {
      let newStatus = this.allSupportTicketStatuss.filter((x, i) => x.id === Number(this.supportTicket.helpDeskStatusId))[0];
      if (newStatus !== undefined && newStatus !== null) {
        this.supportTicketStatusStatusName = newStatus.displayName;
      }

      this._messageService.showSuccess("", "RecordUpdatedSuccessfully");
    });

  }
}
