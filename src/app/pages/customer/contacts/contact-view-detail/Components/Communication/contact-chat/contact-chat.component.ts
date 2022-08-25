import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SMSHistoriesService } from 'src/app/core/services/smshistories.service';
import { ChatUser, ChatMessage, chatData, chatMessagesData } from '../sms/data';

@Component({
  selector: 'app-contact-chat',
  templateUrl: './contact-chat.component.html',
  styleUrls: ['./contact-chat.component.scss']
})
export class ContactChatComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChild('scrollEle') scrollEle;
  @ViewChild('scrollRef') scrollRef;

  isLoading: boolean = false;
  isfirsttime: boolean = true;
  contactId: number;
  contactName: string;
  phoneNo: string;
  smsContent: string;
  id: any;

  username = 'Steven Franklin';

  // bread crumb items
  breadCrumbItems: Array<{}>;

  chatData: ChatUser[];
  chatMessagesData: ChatMessage[];
  messageList: any;

  formData: FormGroup;

  // Form submit
  chatSubmit: boolean;

  usermessage: string;

  constructor(public formBuilder: FormBuilder, private route: ActivatedRoute, private _smsHistoriesService: SMSHistoriesService) {
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Contact' }, { label: 'Chat', active: true }];

    this.contactId = Number(this.route.snapshot.paramMap.get('contactId'));
    this.contactName = this.route.snapshot.paramMap.get('name');
    this.phoneNo = this.route.snapshot.paramMap.get('phoneno');
    this.getSMSHistory();

    this.formData = this.formBuilder.group({
      message: ['', [Validators.required]],
    });

    this.onListScroll();

    this._fetchData();
  }

  ngAfterViewInit() {
    // this.scrollEle.SimpleBar.getScrollElement().scrollTop = 100;
    // this.scrollRef.SimpleBar.getScrollElement().sc = -200;

    this.scrollRef.SimpleBar.getScrollElement().scrollTop = this.scrollRef.SimpleBar.getScrollElement().scrollHeight;

    // this.scrollRef.nativeElement.scrollTop = this.scrollRef.nativeElement.scrollHeight;
  }

  ngAfterViewChecked() {
    if (this.isfirsttime && this.messageList?.length > 0) {
      this.isfirsttime = false;
      this.scrollToBottom();
    }
  }

  //#region API

  getSMSHistory() {
    this.showLoader()
    this._smsHistoriesService.getChatHistory(this.contactId).then(result => {
      
      if (result.result.length > 0) {
        this.messageList = result.result;
        this.scrollToBottom();
      }
    }).finally(() => {
      this.hideLoader()
    });
  }

  sendSMS() {
    this.showLoader();

    this._smsHistoriesService.sendTestSMS(this.phoneNo, this.formData.get('message').value).subscribe(result => {
      this.getSMSHistory();
      this.formData = this.formBuilder.group({
        message: null
      });
    },
      (error) => {
        this.hideLoader()
      }
    );
  }

  //#endregion

  //#region Helper Methods

  showLoader() {
    this.isLoading = true;
  }

  hideLoader() {
    this.isLoading = false;
  }

  scrollToBottom() {
    this.scrollRef.SimpleBar.getScrollElement().scrollTop = this.scrollRef.SimpleBar.getScrollElement().scrollHeight;
  }

  /**
   * Returns form
   */
  get form() {
    return this.formData.controls;
  }

  private _fetchData() {
    this.chatData = chatData;
    this.chatMessagesData = chatMessagesData;
  }

  onListScroll() {
    if (this.scrollRef !== undefined) {
      setTimeout(() => {
        this.scrollRef.SimpleBar.getScrollElement().scrollTop =
          this.scrollRef.SimpleBar.getScrollElement().scrollHeight + 1500;
      }, 500);
    }
  }

  //#endregion

}
