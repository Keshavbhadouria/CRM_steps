import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CreateOrEditReteinerDto } from 'src/app/core/models/Retainer/Retainer';
import { RetainerService } from 'src/app/core/services/retainer.service';
import { MessageService } from 'src/app/core/services/message.service';
@Component({
  selector: 'app-retainer-create-edit-modal',
  templateUrl: './retainer-create-edit-modal.component.html',
  styleUrls: ['./retainer-create-edit-modal.component.scss']
})
export class RetainerCreateEditModalComponent implements OnInit {

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

  allLawfirmreteiners: DropdownDto[];
  allContactList: DropdownDto[];
  allUserList: DropdownDto[];
  allContractStatuss : DropdownDto[];


  contracTemplateName: string;

  contactCompany = '';
    reteinerContractName = '';
    contractStatusStatusName = '';
    userName = '';

  totalCount: number = 0;
  projectList: any;

  // Create

  active = false;
  saving = false;

  reteiner: CreateOrEditReteinerDto = new CreateOrEditReteinerDto();

  constructor(private _retainerService: RetainerService, private _messageService: MessageService, private modalService: NgbModal , private _activatedRoute : ActivatedRoute ) {
    this.loadDropDown();
  }

  ngOnInit() {

    this.breadCrumbItems = [{ label: 'Retainer' }, { label: 'ContractTemplate', active: true }];
    if (this.data) {
      this.reteiner = this.data.reteiner;
    }
    else {
      this.reteiner = new CreateOrEditReteinerDto();

    }
    this._activatedRoute.queryParams.subscribe(params => {
      this.reteiner.contracTemplateNameId = this._activatedRoute.snapshot.paramMap.get('templateid');
      this.contracTemplateName = this._activatedRoute.snapshot.paramMap.get('templatename');
    });
  }

  loadDropDown() {
    this.showLoader();
    const promises = [
      this._retainerService.getAllContactForLookupTable(null, null, 0, 20000),
      this._retainerService.getAllUserForLookupTable(null, null, 0, 2000),
      this._retainerService.getAllContractStatusForTableDropdown(),
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.allContactList = data[0].result.items;
          this.allUserList = data[1].result.items;
          this.allContractStatuss = data[2].result;
        }
        this.hideLoader();
      });
  }


  //#region API Methods


  save() {
    this.showCreateEditLoader();
    if (this.reteiner) {
      this._retainerService.createOrEdit(this.reteiner).then(res => {
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

  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
  }

  //#endregion


}
