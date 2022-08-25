import { Component, OnInit } from '@angular/core';
import { BusinessActionService } from 'src/app/core/services/business-action.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-call-business-action-email-api',
  templateUrl: './call-business-action-email-api.component.html',
  styleUrls: ['./call-business-action-email-api.component.scss']
})
export class CallBusinessActionEmailApiComponent implements OnInit {
  createLoader = false;

  constructor(private _businessActionService: BusinessActionService , private _messageService: MessageService) { }

  ngOnInit(): void {

  }

  sendEmails() {
    this.createLoader = true;
    this._businessActionService.sendAutomationEmailsByBusinessActions().then(res => {
      this.createLoader = false;
      if (res.success) {
        this._messageService.showSuccess('Success', 'Emails sent.');
      } else {
        this._messageService.showError('Error', res.error);
      }
    })
  }

  sendSMS() {
    this.createLoader = true;
    this._businessActionService.SendBusinessActionsSMS().then(res => {
      this.createLoader = false;
      if (res.success) {
        this._messageService.showSuccess('Success', 'SMS sent.');
      } else {
        this._messageService.showError('Error', res.error);
      }
    })
  }

  createContactTask() {
    this.createLoader = true;
    this._businessActionService.CreateContactTaskByBusinessActions().then(res => {
      this.createLoader = false;
      if (res.success) {
        this._messageService.showSuccess('Success', 'Task created.');
      } else {
        this._messageService.showError('Error', res.error);
      }
    })
  }

  createStaffTask() {
    this.createLoader = true;
    this._businessActionService.CreateOperationTaskByBusinessActions().then(res => {
      this.createLoader = false;
      if (res.success) {
        this._messageService.showSuccess('Success', 'Operation Task Created.');
      } else {
        this._messageService.showError('Error', res.error);
      }
    })
  }

}
