import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CreditCardService } from 'src/app/core/services/credit-card.service';
import { MessageService } from 'src/app/core/services/message.service';
import { TenantService } from 'src/app/core/services/tenant.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-credit-card-info',
  templateUrl: './credit-card-info.component.html',
  styleUrls: ['./credit-card-info.component.scss']
})
export class CreditCardInfoComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown = false;
  ccList: any = [];
  isLoading = false;
  editCCData: any;

  @ViewChild('createModal') createModal: ElementRef;

  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'lg'
  };

  constructor(private _ccService: CreditCardService , private modalService: NgbModal,private _messageService: MessageService,) {
    this.getCCInfo();
   }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Tenant' }, { label: 'CreditCard', active: true }];
  }

  getLastFourChar(str) {
    return 'xxxx-xxxx-xxxx-' + str.substr(str.length - 4);
  }


  getCCInfo(): void {
    this.isLoading = true;
    this._ccService.getTenantCCList().then(res => {
      this.isLoading = false;
      this.ccList = res.result.items;
    });
  }


  openCreateModal(modal: any) {
    this.editCCData = null;
    this.modalService.open(modal, this.ngbModalOptions);
  }

  openEditModal(modal: any,data:any) {
    this.editCCData = data;
    this.modalService.open(modal, this.ngbModalOptions);
  }

  modalEmitEvent() {
    this.closeCreateModal();
    this.getCCInfo();
  }

  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
    this.getCCInfo();
  }

  onDelete(id , event) {
    event.stopPropagation();
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
          this._ccService.delete(id)
            .then(res => {
              this.hideLoader();
              if (res.success) {
                this.getCCInfo();
                this._messageService.showSuccess('Deleted!', 'deleted successfully.');
              }
              else {
                this._messageService.showServerSideError();
              }
            });
        }
      });
  }

  showLoader() {
    this.isLoading = true;
  }
  hideLoader() {
    this.isLoading = false;
  }


}
