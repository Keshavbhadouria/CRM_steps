import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-retainer-view-modal',
  templateUrl: './retainer-view-modal.component.html',
  styleUrls: ['./retainer-view-modal.component.scss']
})
export class RetainerViewModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  baseURL = environment.apiURL;
  item: any;

  constructor(private _messageService: MessageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Retainer' }, { label: 'ViewRetainer', active: true }];
    if (this.data) {
      this.item = this.data;
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
