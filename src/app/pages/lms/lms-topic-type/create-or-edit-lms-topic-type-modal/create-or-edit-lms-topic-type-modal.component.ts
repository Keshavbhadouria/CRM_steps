import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CreateOrEditTopicTypeDto, LmsTopicTypeService } from 'src/app/core/services/lms-topic-type.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-or-edit-lms-topic-type-modal',
  templateUrl: './create-or-edit-lms-topic-type-modal.component.html',
  //styleUrls: ['./create-or-edit-lms-topic-type-modal.component.scss']
})
export class CreateOrEditLmsTopicTypeModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  topicType: CreateOrEditTopicTypeDto;
  loading = false;
  createLoader = false;

  isAttachment: boolean = false;
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  imageUrl: string = '';


  constructor(private _lmsTopicTypeService: LmsTopicTypeService,
    private _messageService: MessageService) { }

  ngOnInit(): void {
    if (this.data) {
      this.topicType = this.data;
      if (this.topicType.iconUrl != null && this.topicType.iconUrl != '') {
        this.isAttachment = true;
        this.imageUrl = environment.apiURL + "/" + this.topicType.iconUrl;
      }
    }
    else {
      this.topicType = new CreateOrEditTopicTypeDto();
      this.isAttachment = false;
      this.imageUrl = '';
    }
  }
  save() {
    this.showCreateEditLoader();
    if (this.topicType) {
      this._lmsTopicTypeService.createOrEdit(this.topicType).then(res => {
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
  handleUpload(event) {
    const file = event.target.files[0];
    if (event.target.files[0].type.includes('image')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.topicType.iconUrl = reader.result.toString().substring(reader.result.toString().indexOf(',') + 1);
      };
    }
    else {
      this.myInputVariable.nativeElement.value = "";
      this._messageService.showError("Common.Title.Error", "Messages.OnlyImageType");
    }
  }

  changeImage() {
    this.isAttachment = false;
  }
}
