import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CampaignObjetivesServiceProxy } from 'src/app/core/services/campaign-objectives.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-campaign-objectives-view',
  templateUrl: './campaign-objectives-view.component.html',
  styleUrls: ['./campaign-objectives-view.component.scss']
})
export class CampaignObjectivesViewComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;

  breadCrumbItems: Array<{}>;
  baseURL = environment.apiURL;
  pmtaskFrequency: any;
  
  constructor(private _taskFrequenciesService: CampaignObjetivesServiceProxy,
    private _messageService: MessageService,
     private modalService: NgbModal) { }

     ngOnInit() {
      this.breadCrumbItems = [{ label: 'Tasks' }, { label: 'Task Frequency', active: true }];
      if (this.data) {
        this.pmtaskFrequency = this.data;
      }
    }
  
    closeCreateModal(reason?: any) {
      if (reason) {
        this.modalService.dismissAll(reason);
      } else {
        this.modalService.dismissAll();
      }
    }
}
