import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ButtonSettings, ColumnSetting, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { MessageService } from 'src/app/core/services/message.service';
import { trainingService } from 'src/app/core/services/training.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import Player from '@vimeo/player';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  breadCrumbItems: Array<{}>;


  advancedFiltersAreShown = false;
  filterText = '';
  titleFilter = '';
  descriptionFilter = '';
  urlFilter = '';
  downloadableTemplateFilter = '';
  lawfirmServiceServicesNameFilter = '';

  viewStatus: any;
  editStatus: any;
  loading = false;
  createLoader = false;

  totalCount: number = 0;
  statusList: any;
  myData: any = [];

  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;

  @ViewChild('openVideoModal') openVideoModal: ElementRef;

  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'md'
  };

  @ViewChildren('playVimeo') playVimeo;

  paginationSettings: PaginationSettings = new PaginationSettings();
  result: any;
  videos: any;
  currentVideo: any;
  baseURL = environment.apiURL + "\\";
  isYoutube: boolean = false;
  youtubeId: any;
  isVimeo: boolean = false;
  player: any;
  vimeoPlayer: string;
  //#endregion

  constructor(private _messageService: MessageService,
    private modalService: NgbModal,
    private _trainingService: trainingService) {

  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Trainings' }, { label: 'TrainingVideos', active: true }];
    // this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
  }

  getRecords() {
    this.showLoader();
    this._trainingService.getAllWithoutFilter(this.filterText).then(res => {

      this.videos = res.result;
      this.hideLoader();
      console.log(this.result);
    })
  }
  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }
  filterRecords() {
    this.paginationSettings.pageIndex = 0;
    this.getRecords();
  }

  openCreateModal(modal: any) {
    this.editStatus = null;
    this.modalService.open(modal, this.ngbModalOptions);
  }

  onEdit(modal:any, obj){
    this.editStatus = obj;
    this.modalService.open(modal, this.ngbModalOptions);
  }
  modalEmitEvent() {
    this.closeCreateModal();
this.paginationSettings.pageIndex = 0;
    this.getRecords();
  }

  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
  }

  onDelete(id) {
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
          this._trainingService.delete(id)
            .then(res => {
              this.hideLoader();
              if (res.success) {
                this.getRecords();
                this._messageService.showSuccess('Deleted!', 'deleted successfully.');
              }
              else {
                this._messageService.showServerSideError();
              }
            });
        }
      });
  }
  openVideo(data){

    this.currentVideo =  data.trainingVideos.url;
    if(data.trainingVideos.url.indexOf("youtube") > -1){
      this.isYoutube = true;
      this.isVimeo = false;
        this.youtubeId = data.trainingVideos.url.split("https://www.youtube.com/watch?v=")[1];
    }
    if(data.trainingVideos.url.indexOf("vimeo") > -1 || data.trainingVideos.url.indexOf("boomstream") > -1){
      this.isYoutube = false;
      this.isVimeo = true;
      this.vimeoPlayer = '<iframe src="'+ data.trainingVideos.url + '" width="470" height="250" frameborder="0" allowfullscreen allow="autoplay; encrypted-media"></iframe>';
    }
    this.modalService.open(this.openVideoModal, this.ngbModalOptions);
  }
}
