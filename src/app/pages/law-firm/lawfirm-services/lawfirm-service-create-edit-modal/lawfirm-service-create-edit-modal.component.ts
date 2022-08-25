import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateOrEditLawfirmServiceDto } from 'src/app/core/models/Lawfirm/LawfirmServices';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { LawfirmServicesService } from 'src/app/core/services/lawfirm-services.service';
import { MessageService } from 'src/app/core/services/message.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-lawfirm-service-create-edit-modal',
  templateUrl: './lawfirm-service-create-edit-modal.component.html',
  styleUrls: ['./lawfirm-service-create-edit-modal.component.scss']
})
export class LawfirmServiceCreateEditModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('targetDate') targetDate: ElementRef;
  public Editor = ClassicEditor;

  // bread crumb items
  loading = false;
  createLoader = false;
  loadingDropdown = false;
  breadCrumbItems: Array<{}>;

  allLawfirmlawfirmServices: DropdownDto[];


  totalCount: number = 0;
  projectList: any;

  // Create

  active = false;
  saving = false;

  lawfirmService: CreateOrEditLawfirmServiceDto = new CreateOrEditLawfirmServiceDto();

  constructor(private _LawfirmService: LawfirmServicesService, private _messageService: MessageService, private modalService: NgbModal) {
    this.loadDropDown();
   }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Lawfirm Service' }, { label: 'Create LawfirmServices', active: true }];
    if (this.data) {
      this.lawfirmService = this.data.lawfirmService;
    }
    else {
      this.lawfirmService = new CreateOrEditLawfirmServiceDto();
    }
  }


  //#region API Methods


  save() {
    this.showCreateEditLoader();
    if (this.lawfirmService) {
      this._LawfirmService.createOrEdit(this.lawfirmService).then(res => {
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

  loadDropDown() {
    this.showLoader();
    const promises = [
      this._LawfirmService.getAllLawfirmFeeTypeForTableDropdown(),
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.allLawfirmlawfirmServices = data[0].result;
        }
        this.hideLoader();
      });
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

  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
  }

  //#endregion


}
