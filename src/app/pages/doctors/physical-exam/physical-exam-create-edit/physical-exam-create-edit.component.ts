import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateOrEditHistoriaClinicaExamenFisicoDto, PhysicalExamService } from 'src/app/core/services/physical-exam.service';


@Component({
  selector: 'app-physical-exam-create-edit',
  templateUrl: './physical-exam-create-edit.component.html',
  styleUrls: ['./physical-exam-create-edit.component.scss']
})
export class PhysicalExamCreateEditComponent implements OnInit {
 
  allContacts: any;
  constructor(private _phyExamService: PhysicalExamService,
    private _messageService: MessageService) { }
    @Input() public modal: any
    @Input() public data: any;
    @Output() $modalClose = new EventEmitter();
    historiaClinicaExamenFisico: CreateOrEditHistoriaClinicaExamenFisicoDto;
    loading = false;
    createLoader = false;
  
    ngOnInit(): void {
      this.loadDropDown();
      if (this.data) {
        
        this.historiaClinicaExamenFisico = this.data;
      }
      else {
        this.historiaClinicaExamenFisico = new CreateOrEditHistoriaClinicaExamenFisicoDto();
      }
    }
  
    save() {
      this.showCreateEditLoader();
      if (this.historiaClinicaExamenFisico) {
        this._phyExamService.createOrEdit(this.historiaClinicaExamenFisico).then(res => {
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
    loadDropDown(){
      const promises = [
        this._phyExamService.getAllContactForTableDropdown(),
      ];
      Promise.all(promises)
        .then(data => {
          if (data.length > 0) {
            this.allContacts = data[0].result;
          }
          this.hideLoader();
        });
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

}
