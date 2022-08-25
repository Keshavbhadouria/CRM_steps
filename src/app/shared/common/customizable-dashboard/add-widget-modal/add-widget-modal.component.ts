import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { WidgetOutput } from 'src/app/core/services/dashboard-customization.service';

@Component({
  selector: 'add-widget-modal',
  templateUrl: './add-widget-modal.component.html',
  styleUrls: ['./add-widget-modal.component.scss']
})
export class AddWidgetModalComponent implements OnInit {

  @Output() onClose = new EventEmitter();
  @ViewChild('addWidgetModal', { static: true }) modal: ModalDirective;

  widgets: WidgetOutput[];
  saving = false;
  selectedWidgetId: string;

  @Input() userWidgets : WidgetOutput[];

  constructor(private modalService:NgbModal) { }

  ngOnInit(): void {
    this.show(this.userWidgets);
  }
  close(): void {
    this.onClose.emit();
    //this.hide();
  }

  save(): void {
    this.onClose.emit(this.selectedWidgetId);
    //this.hide();
  }

  show(widgets: WidgetOutput[]): void {
    
    this.widgets = widgets;

    if (this.widgets && this.widgets.length) {
      this.selectedWidgetId = this.widgets[0].id;
    } else {
      this.selectedWidgetId = null;
    }

    //this.modal.show();
  }

  hide(): void {
    //this.modal.hide();
  }
}
