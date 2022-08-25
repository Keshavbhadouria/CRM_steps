import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CreateOrEditTrainingVideosDto, trainingService } from 'src/app/core/services/training.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-training-create-edit',
  templateUrl: './training-create-edit.component.html',
  styleUrls: ['./training-create-edit.component.scss']
})
export class TrainingCreateEditComponent implements OnInit {
  allServices: any;
  baseURL = environment.apiURL + "\\";

  constructor(private _trainingVideossService: trainingService,
    private _messageService: MessageService) { }
    public Editor = ClassicEditor;
    isAttachment= false;
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  trainingVideos: CreateOrEditTrainingVideosDto = new CreateOrEditTrainingVideosDto();
  loading = false;
  createLoader = false;
  allCountries = [];
  images: any[] = [];
  ngOnInit(): void {
    this._trainingVideossService.getAllLawfirmServiceForTableDropdown().then(res => {
      this.allServices = res.result;
    });
    if (this.data) {
      this.trainingVideos = this.data;
      if(this.trainingVideos.downloadableTemplate)
        this.isAttachment = true;
    }
    else {
      this.trainingVideos = new CreateOrEditTrainingVideosDto();
      this.trainingVideos.description='';
    }
  }
  changeImage(){
    this.isAttachment = false;
  }
  save() {
    this.showCreateEditLoader();
    
    if (this.trainingVideos) {
      this._trainingVideossService.createOrEdit(this.trainingVideos).then(res => {
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
        this.trainingVideos.downloadableTemplate = reader.result.toString().substring(reader.result.toString().indexOf(',') + 1);
        this.trainingVideos.thumbnailUrl = reader.result.toString().substring(reader.result.toString().indexOf(',') + 1);
      };
    }
    else {
      this.myInputVariable.nativeElement.value = "";
      this._messageService.showError("Common.Title.Error", "Messages.OnlyImageType");
    }
  }
}
