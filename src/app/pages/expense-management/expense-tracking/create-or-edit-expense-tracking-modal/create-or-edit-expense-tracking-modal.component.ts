import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { CreateOrEditExpenseTrackingDto, ExpenseTrackingService } from 'src/app/core/services/expense-tracking.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MessageService } from 'src/app/core/services/message.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-or-edit-expense-tracking-modal',
  templateUrl: './create-or-edit-expense-tracking-modal.component.html',
  //styleUrls: ['./create-or-edit-expense-tracking-modal.component.scss']
})
export class CreateOrEditExpenseTrackingModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  expenseTracking: CreateOrEditExpenseTrackingDto;
  loading = false;
  createLoader = false;

  contacts: DropdownDto[];
  vendors: DropdownDto[];
  expenseTypes: DropdownDto[];

  public editor = ClassicEditor;

  isAttachment: boolean = false;
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  imageUrl: string = '';

  constructor(private _expenseTrackingService: ExpenseTrackingService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.expenseTracking = this.data;
      if (this.expenseTracking.attatchment != null && this.expenseTracking.attatchment != '') {
        this.isAttachment = true;
        this.imageUrl = environment.apiURL + "/" + this.expenseTracking.attatchment;
      }
    }
    else {
      this.expenseTracking = new CreateOrEditExpenseTrackingDto();
      this.isAttachment = false;
      this.expenseTracking.description = '';
      this.imageUrl = '';
    }
    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      this._expenseTrackingService.getAllContactForTableDropdown(),
      this._expenseTrackingService.getAllCRMVendorForTableDropdown(),
      this._expenseTrackingService.getAllServiceExpenseTypeForTableDropdown()
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {

          this.contacts = data[0].result;
          this.vendors = data[1].result;
          this.expenseTypes = data[2].result;

        }
        this.hideLoader();
      });
  }
  save(): void {
    this.showCreateEditLoader();
    if (this.expenseTracking) {
      this._expenseTrackingService.createOrEdit(this.expenseTracking).then(res => {
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
  handleUpload(event) {
    const file = event.target.files[0];
    if (event.target.files[0].type.includes('image')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.expenseTracking.attatchment = reader.result.toString().substring(reader.result.toString().indexOf(',') + 1);
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
