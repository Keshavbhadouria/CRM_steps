import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { CreateOrEditPMProjectDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { MessageService } from 'src/app/core/services/message.service';
import { PMIndustriesServiceProxy } from 'src/app/core/services/industry.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-industry',
  templateUrl: './industry.component.html',
  styleUrls: ['./industry.component.scss']
})
export class IndustryComponent implements OnInit {
  baseURL = environment.apiURL;
  // bread crumb items
  loading = false;
  createLoader = false;
  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown: boolean = false;
  filterText = '';
  industryFilter = '';
  industryList: any;
  totalCount = 0;
  editIndustry: any;
  viewIndustry: any;

  constructor(private _pmIndustriesServiceProxy: PMIndustriesServiceProxy, private _messageService: MessageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'ProjectManagement' }, { label: 'Industries', active: true }];
    this.getPMIndustries();
  }

  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
  }

  modalEmitEvent() {
    this.closeCreateModal();
    this.getPMIndustries();
  }

  getPMIndustries() {
    this.showLoader();
    this._pmIndustriesServiceProxy.getAll(
      this.filterText,
      this.industryFilter,
      null,
      0,
      10
    ).then(res => {

      if (res.success) {
        this.industryList = res.result.items;
        this.totalCount = res.result.totalCount;
        this.hideLoader();
      } else {
        this._messageService.showServerSideError();
        this.hideLoader();
      }
    })
  }
  showLoader() {
    this.loading = true;
  }
  openCreateModal(modal: any) {
    this.editIndustry = null;
    this.modalService.open(modal, { size: 'xl' });
  }

  hideLoader() {
    this.loading = false;
  }
  onDelete(data) {
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
          if (this.deleteIndustry(data)) {
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
            this.industryList = this.industryList.filter(obj => { return obj !== data });
          } else {
            this._messageService.showServerSideError();
          }

        }
      });
  }
  deleteIndustry(data): boolean {
    return this._pmIndustriesServiceProxy.delete(data.pmIndustry.id).then(res => {
      if (res.success)
        return true;
      else
        return false;
    });
  }
  onEditIndustry(item, modal) {
    this.editIndustry = item;
    this.modalService.open(modal, {
      size: 'md', backdrop: 'static',
      keyboard: false,
    });
  }

  onViewIndustry(item, modal) {
    this.viewIndustry = item;
    this.modalService.open(modal, {
      size: 'md', backdrop: 'static',
      keyboard: false,
    });
  }

}
