import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LawfirmFeeTypeService } from 'src/app/core/services/lawfirm-fee-type.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fee-type-view-modal',
  templateUrl: './fee-type-view-modal.component.html',
  styleUrls: ['./fee-type-view-modal.component.scss']
})
export class FeeTypeViewModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  baseURL = environment.apiURL;
  FeeType: any;

  constructor(private _messageService: MessageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Projects' }, { label: 'Projects View', active: true }];
    if (this.data) {
      this.FeeType = this.data;
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
