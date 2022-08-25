import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/core/services/message.service';
import { SprintTypesService } from 'src/app/core/services/Sprint-Types.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sprint-types-view-modal',
  templateUrl: './sprint-types-view-modal.component.html',
  styleUrls: ['./sprint-types-view-modal.component.scss']
})
export class SprintTypesViewModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  baseURL = environment.apiURL;
  SprintTypes: any;

  constructor(private _SprintTypesService: SprintTypesService, private _messageService: MessageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Projects' }, { label: 'Projects View', active: true }];
    if (this.data) {
      this.SprintTypes = this.data;
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

