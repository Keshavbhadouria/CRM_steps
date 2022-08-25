import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BusinessActionService, CreateOrEditBusinessActionScriptDto } from 'src/app/core/services/business-action.service';
import { MessageService } from 'src/app/core/services/message.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-business-actions-create-edit',
  templateUrl: './business-actions-create-edit.component.html',
  styleUrls: ['./business-actions-create-edit.component.scss']
})
export class BusinessActionsCreateEditComponent implements OnInit {

  constructor(private _actionService: BusinessActionService,
    private _messageService: MessageService) { }
    public Editor = ClassicEditor;
    @Input() public businessWorkflowId : any
    @Input() public modal: any
    @Input() public data: any;
    @Output() $modalClose = new EventEmitter();
    businessActionScript: CreateOrEditBusinessActionScriptDto;
    loading = false;
    createLoader = false;
    allActionType: any[];
    allLeadTemprature: any[];
    allFirmSerices: any[];
    allActivity:any[];
    allStep: any[];
    allTargetTitle: any[]

    ngOnInit(): void {
      this.loadDropDown();


      if (this.data) {
        this.businessActionScript = this.data;
        if(this.businessActionScript.lawfirmServiceId !=null){
          this._actionService.getAllServiceActivityForTableDropdown(this.businessActionScript.lawfirmServiceId).then(res => {
            this.allActivity = res.result;
          });
        }
        if(this.businessActionScript.serviceActivityId !=null){
          this._actionService.getAllServicesActivityStepForTableDropdown(this.businessActionScript.serviceActivityId).then(res => {
            this.allStep = res.result;
          });
        }
      }
      else {
        this.businessActionScript = new CreateOrEditBusinessActionScriptDto();
        this.businessActionScript.businessWorkflowId = this.businessWorkflowId;
        this.businessActionScript.contentScript = '';
      }
    }

  loadDropDown() {
    this.showLoader();
      const promises = [
        this._actionService.getAllActionTypeForTableDropdown(),
        this._actionService.getAllLawfirmServiceForTableDropdown(),
        this._actionService.getAllLeadTemperatureForTableDropdown(),
        this._actionService.getAllTargetTitleForTableDropdown()
      ];
      Promise.all(promises)
        .then(data => {
          if (data.length > 0) {
            this.allActionType = data[0].result;
            this.allFirmSerices = data[1].result;
            this.allLeadTemprature = data[2].result;
            this.allTargetTitle = data[3].result;
          }
          this.hideLoader();
        });
    }


    save() {
      this.showCreateEditLoader();
      if (this.businessActionScript) {
        this._actionService.createOrEdit(this.businessActionScript).then(res => {
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
    changeLawService(data){
      this._actionService.getAllServiceActivityForTableDropdown(data.id).then(res => {
        this.allActivity = res.result;
      });
    }
    changeActivity(data){
      this._actionService.getAllServicesActivityStepForTableDropdown(data.id).then(res => {
        this.allStep = res.result;
      });
    }
}
