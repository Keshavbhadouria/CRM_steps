import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ButtonSettings, ColumnSetting, PaginationSettings } from 'src/app/core/models/DynamicTable/dynamic-table-config';
import { MessageService } from 'src/app/core/services/message.service';
import { PhysicalExamService } from 'src/app/core/services/physical-exam.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-physical-exam',
  templateUrl: './physical-exam.component.html',
  styleUrls: ['./physical-exam.component.scss']
})
export class PhysicalExamComponent implements OnInit {

  breadCrumbItems: Array<{}>;

  advancedFiltersAreShown = false;
  filterText = '';
  fcFilter = '';
  maxPulsoFilter: number;
  maxPulsoFilterEmpty: number;
  minPulsoFilter: number;
  minPulsoFilterEmpty: number;
  taFilter = '';
  maxTemperaturaFilter: number;
  maxTemperaturaFilterEmpty: number;
  minTemperaturaFilter: number;
  minTemperaturaFilterEmpty: number;
  maxTalla_PiesFilter: number;
  maxTalla_PiesFilterEmpty: number;
  minTalla_PiesFilter: number;
  minTalla_PiesFilterEmpty: number;
  maxTalla_pulgadasFilter: number;
  maxTalla_pulgadasFilterEmpty: number;
  minTalla_pulgadasFilter: number;
  minTalla_pulgadasFilterEmpty: number;
  maxPesoFilter: number;
  maxPesoFilterEmpty: number;
  minPesoFilter: number;
  minPesoFilterEmpty: number;
  maxSCm2Filter: number;
  maxSCm2FilterEmpty: number;
  minSCm2Filter: number;
  minSCm2FilterEmpty: number;
  palidezFilter = '';
  maxIctericiaFilter: number;
  maxIctericiaFilterEmpty: number;
  minIctericiaFilter: number;
  minIctericiaFilterEmpty: number;
  peloFilter = '';
  unasFilter = '';
  comentariosFilter = '';
  contactCompanyFilter = '';
  contactId: number;

  viewStatus: any;
  editStatus: any;
  loading = false;
  createLoader = false;

  totalCount: number = 0;
  jobTypeList: any;
  myData: any = [];

  @ViewChild('viewModal') viewModal: ElementRef;
  @ViewChild('createModal') createModal: ElementRef;

  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'xl'
  };

  //#region Table Configurations

  tableSettings: ColumnSetting[] = [
    {
      primaryKey: 'sr#',
      header: 'Sr#',
    },
    {
      primaryKey: 'contactCompany',
      header: 'Company',
    },
    {
      primaryKey: 'historiaClinicaExamenFisico.fc',
      header: 'FC',
    },
    {
      primaryKey: 'historiaClinicaExamenFisico.pulso',
      header: 'Pulso',
    },
    {
      primaryKey: 'historiaClinicaExamenFisico.ta',
      header: 'TA',
    },
    {
      primaryKey: 'historiaClinicaExamenFisico.temperatura',
      header: 'Temperatura',
    },
    {
      primaryKey: 'historiaClinicaExamenFisico.talla_Pies',
      header: 'Talla_Pies',
    },
    {
      primaryKey: 'historiaClinicaExamenFisico.talla_pulgadas',
      header: 'Talla_pulgadas',
    },
    {
      primaryKey: 'historiaClinicaExamenFisico.peso',
      header: 'Peso',
    },
    {
      primaryKey: 'historiaClinicaExamenFisico.sCm2',
      header: 'SCm2',
    },
    {
      primaryKey: 'historiaClinicaExamenFisico.Ictericia',
      header: 'Ictericia',
    },
    {
      primaryKey: 'historiaClinicaExamenFisico.Unas',
      header: 'Unas',
    },
    {
      primaryKey: 'historiaClinicaExamenFisico.comentarios',
      header: 'comentarios',
    }
  ];

  buttonSettings: ButtonSettings[] = [
    {
      title: 'View',
      func: (obj) => {
        this.viewStatus = obj;
        this.modalService.open(this.viewModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/Visual.png'
    },
    {
      title: 'Edit',
      func: (obj) => {
        this.editStatus = obj.historiaClinicaExamenFisico;
        this.modalService.open(this.createModal, this.ngbModalOptions);
      },
      icon: '../../../../assets/icons/editIcon.png'
    },
    {
      title: 'Delete',
      func: (obj) => {
        this.onDelete(obj.onlineTools.id);
      },
      icon: '../../../../assets/icons/deleteIcon.png'
    },
  ];

  paginationSettings: PaginationSettings = new PaginationSettings();
  //#endregion

  constructor(private _messageService: MessageService,
    private modalService: NgbModal,
    private _phyExamervice: PhysicalExamService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'ServicesSchedules' }, { label: 'JobTypes', active: true }];
    this.paginationSettings.getRecords = () => this.getRecords();
    this.getRecords();
  }
  getRecords() {
    this.showLoader();
    this._phyExamervice.getAll(
      this.filterText,
      this.fcFilter,
      this.maxPulsoFilter == null ? this.maxPulsoFilterEmpty : this.maxPulsoFilter,
      this.minPulsoFilter == null ? this.minPulsoFilterEmpty : this.minPulsoFilter,
      this.taFilter,
      this.maxTemperaturaFilter == null ? this.maxTemperaturaFilterEmpty : this.maxTemperaturaFilter,
      this.minTemperaturaFilter == null ? this.minTemperaturaFilterEmpty : this.minTemperaturaFilter,
      this.maxTalla_PiesFilter == null ? this.maxTalla_PiesFilterEmpty : this.maxTalla_PiesFilter,
      this.minTalla_PiesFilter == null ? this.minTalla_PiesFilterEmpty : this.minTalla_PiesFilter,
      this.maxTalla_pulgadasFilter == null ? this.maxTalla_pulgadasFilterEmpty : this.maxTalla_pulgadasFilter,
      this.minTalla_pulgadasFilter == null ? this.minTalla_pulgadasFilterEmpty : this.minTalla_pulgadasFilter,
      this.maxPesoFilter == null ? this.maxPesoFilterEmpty : this.maxPesoFilter,
      this.minPesoFilter == null ? this.minPesoFilterEmpty : this.minPesoFilter,
      this.maxSCm2Filter == null ? this.maxSCm2FilterEmpty : this.maxSCm2Filter,
      this.minSCm2Filter == null ? this.minSCm2FilterEmpty : this.minSCm2Filter,
      this.palidezFilter,
      this.maxIctericiaFilter == null ? this.maxIctericiaFilterEmpty : this.maxIctericiaFilter,
      this.minIctericiaFilter == null ? this.minIctericiaFilterEmpty : this.minIctericiaFilter,
      this.peloFilter,
      this.unasFilter,
      this.comentariosFilter,
      this.contactCompanyFilter,
      this.contactId,
      null,
      this.paginationSettings.pageIndex * this.paginationSettings.pageSize,
      this.paginationSettings.pageSize
    ).then(res => {
      this.hideLoader();
      if (res.success) {
        this.jobTypeList = res.result.items;
        this.myData = [];
        this.myData = res.result.items;
        this.paginationSettings.setPaginationData(res);
      } else {
        this._messageService.showServerSideError();
      }
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
        title: this.translate.instant('Areyousure?'),
        text: this.translate.instant('RevertMsg'),
        icon: 'warning',
        confirmButtonText: this.translate.instant('confirmButtonTextMsg'),
        cancelButtonText: this.translate.instant('cancelButtonTextMsg'),
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          this.showLoader();
          this._phyExamervice.delete(id)
            .then(res => {
              this.hideLoader();
              if (res.success) {
                this.getRecords();
                this._messageService.showSuccess(this.translate.instant('Deleted!'),
                  this.translate.instant('RecordDeletedSuccessfully'));
              }
              else {
                this._messageService.showServerSideError();
              }
            });
        }
      });
  }
}
