import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MeetingsTimeSlotService } from 'src/app/core/services/meetings-time-slot.service';
import { MessageService } from 'src/app/core/services/message.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-meeting-availability',
  templateUrl: './meeting-availability.component.html',
  styleUrls: ['./meeting-availability.component.scss']
})
export class MeetingAvailabilityComponent implements OnInit {
  
  breadCrumbItems: Array<{}>;
  advancedFiltersAreShown = false;
  filterText = '';
  typeFilter = '';
  active = false;
  saving = false;
  type: string;
  appPolicyForm: FormGroup;
  isContentOpen: boolean = false;
  time: any;
  userId: any;

  meetingDays: any;
  lawyerList: any;
  filterLawyersList: any;
  timeSlots: any = [{ timeOrder: 9, startTime: '9:00 am', endTime: '10:00 am' }, { timeOrder: 10, startTime: '10:00 am', endTime: '11:00 am' }, { timeOrder: 11, startTime: '11:00 am', endTime: '12:00 pm' }, { timeOrder: 12, startTime: '00:00 pm', endTime: '1:00 pm' }, { timeOrder: 13, startTime: '1:00 pm', endTime: '2:00 pm' }, { timeOrder: 14, startTime: '2:00 pm', endTime: '3:00 pm' }, { timeOrder: 15, startTime: '3:00 pm', endTime: '4:00 pm' }, { timeOrder: 16, startTime: '4:00 pm', endTime: '5:00 pm' }];
  loading: boolean = false;

  constructor(private _mettingService: MeetingsTimeSlotService, private _messageService: MessageService,private translate: TranslateService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Meeting' }, { label: 'MeetingAvailability', active: true }];
    this.getAllLawyers()
  }
  getAllLawyers() {
    this.showLoader();
    this._mettingService.getAllLawyers().then(res => {
      this.lawyerList = res.result;
      this.filterLawyersList = res.result;
      this.hideLoader();
    });
  }
  filterRecords(){
    
    this.filterLawyersList = this.lawyerList.filter(x => x.name.toLowerCase().startsWith(this.filterText.toLowerCase()));
  }
  deleteTimeSlot(meetingDay, slot) {
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
          if (slot.id > 0) {
            this._mettingService.delete(slot.id).then(res => {
              let index = meetingDay.meetingTimeSlots.indexOf(slot);
              meetingDay.meetingTimeSlots.splice(index, 1);
              this._messageService.showSuccess(this.translate.instant('Deleted!'),
                this.translate.instant('RecordDeletedSuccessfully'));
            });
          } else {
            let index = meetingDay.meetingTimeSlots.indexOf(slot);
            meetingDay.meetingTimeSlots.splice(index, 1);
          }
          this.hideLoader();
        }
      });
  }
  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }
  onCheckboxChange(meetingDay, event) {
    this.showLoader();
    meetingDay.isSelected = event.target.checked;
    let obj = {
      "name": meetingDay.dayFullName,
      "meetingDaysLookupId": meetingDay.id,
      "userId": this.userId,
    }

    this.createOrEditMeetingDays(obj);
  }
  getMeetingAvailability(userId) {
    this.meetingDays = [];
    this.showLoader();
    this._mettingService.getMeetingDaysByLawyerId(userId).then(res => {
     this.hideLoader();
      this.meetingDays = res.result;
    });
  }
  onSelect(userId: string, $event: any): void {
    if ($event) {
      this.userId = userId;
      this.getMeetingAvailability(this.userId);
    }
  }
  createOrEditMeetingDays(obj: any) {
    this.showLoader();
    this._mettingService.createOrEditMeetingDays(obj).then(res => {
      this.hideLoader();
      this.meetingDays = res.result;
      this.getMeetingAvailability(this.userId);
    });
  }
  timeChanged(meetingDayId, slot, event) {
    // console.log(meetingDayId);
    // console.log(slot);
    // let endDate = new Date(event);
    // slot.startTime = event.toLocaleTimeString().toString().substring(0, 4) + event.toLocaleTimeString().toString().substring(7);
    // let endTime = new Date(endDate.setHours(endDate.getHours() + 1)).toLocaleTimeString().toString();
    // slot.endTime = endTime.substring(0, 4) + endTime.substring(7);

    let slotTime = this.timeSlots.find(x => x.startTime == event);


    let meetingday = this.meetingDays.find(x => x.meetingDayId == slot.meetingDaysId);
    if (meetingday) {
        if (meetingday.meetingTimeSlots.find(x => x.timeOrder == slotTime.timeOrder)) {
            slot.startTime = '';
            slot.endTime = '';
            this._messageService.showError('','Time slot already exist.');
            return;
        }
    }
    else {
      this._messageService.showError('','Meeting Day Not Exist.');
    }

    slot.startTime = slotTime.startTime;
    slot.endTime = slotTime.endTime;

    let obj = {
        "timeOrder": slotTime.timeOrder,
        "startTime": slot.startTime,
        "endTime": slot.endTime,
        "meetingDaysId": slot.meetingDaysId
    }
    this.createTimeSlot(obj);
}

addSlot(meetingDay) {
    let obj = {
        "timeOrder": 0,
        "startTime": "",
        "endTime": "",
        "meetingDaysId": meetingDay.meetingDayId
    }
    meetingDay.meetingTimeSlots.push(obj);
}
createTimeSlot(obj: any) {
  
  this.showLoader();
  this._mettingService.createOrEdit(obj).then(res => {
      this.hideLoader();
      this.getMeetingAvailability(this.userId);
  });
}

}
