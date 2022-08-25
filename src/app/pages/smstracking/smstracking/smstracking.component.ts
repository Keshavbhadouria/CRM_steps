import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserFriendMessagesDto, UserSMSFriendDto } from 'src/app/core/models/Customer/SmsHistories';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SMSHistoriesService } from 'src/app/core/services/smshistories.service';
import { ChatUser, ChatMessage, chatData, chatMessagesData } from '../../customer/contacts/contact-view-detail/Components/Communication/sms/data';

@Component({
  selector: 'app-smstracking',
  templateUrl: './smstracking.component.html',
  styleUrls: ['./smstracking.component.scss']
})
export class SMSTrackingComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChild('scrollEle') scrollEle;
  @ViewChild('scrollRef') scrollRef;

  userName: string;


  isLoading: boolean = false;
  isChatListLoading: boolean = false;
  isfirsttime: boolean = true;
  contactId: number;
  contactName: string;
  phoneNo: string;
  smsContent: string;
  id: any;

  userFriends: UserSMSFriendDto[] = [];
  filterdUserFriends: UserSMSFriendDto[] = [];
  userFriendChatMsgs: UserFriendMessagesDto[] = [];
  activeFriendFullName: string = "";
  activeFriendPhone: string = "";
  txtInputMessage: string = "";

  defaultActiveId: number = 0;


  // bread crumb items
  breadCrumbItems: Array<{}>;

  chatData: ChatUser[];
  chatMessagesData: ChatMessage[];
  messageList: any;

  formData: FormGroup;

  // Form submit
  chatSubmit: boolean;

  usermessage: string;

  constructor(public formBuilder: FormBuilder, private route: ActivatedRoute, private _smsHistoriesService: SMSHistoriesService ,  private _authService: AuthenticationService,) {
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Contact' }, { label: 'SMS', active: true }];
    this.userName = this._authService.getLoggedInUserName();
    this.formData = this.formBuilder.group({
      message: ['', [Validators.required]],
    });

    this.onListScroll();

    this.getUserFriends();
  }

  filterdFriend(filter: string) {
    if (filter) {
      this.filterdUserFriends = this.userFriends.filter(x => x.fullName.toLowerCase().startsWith(filter.toLowerCase()) || x.phone.toLowerCase().includes(filter.toLowerCase()));
    }
    else {
      this.filterdUserFriends = [...this.userFriends];
    }
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

  getSMSHistory(contactId , contactName , phoneNo) {
    this.showLoader()
    this.isfirsttime = true;
    this.contactId = contactId;
    this.contactName = contactName;
    this.phoneNo = phoneNo;
    this.messageList = [];
    this._smsHistoriesService.getAllByContactId(null, null, null, null, contactId, null, null, null, null, null, null, 0, 200).then(result => {
      if (result.result.totalCount > 0) {
        this.messageList = result.result.items;
        this.scrollToBottom();
      }
    }).finally(() => {
      this.hideLoader()
    });
  }

  getUserFriends(): void {
    this.showChatListLoader()
    this._smsHistoriesService.getUserFriends().then(result => {
      this.userFriends = result.result;
      this.filterdUserFriends = [...this.userFriends];
      if (this.userFriends.length > 0) {
        this.contactId = this.userFriends[0].contactId;
        this.contactName = this.userFriends[0].fullName;
        this.phoneNo = this.userFriends[0].phone;
        this.getSMSHistory(this.contactId, this.contactName, this.phoneNo);
      }
    }).finally(() => {
      this.hideChatListLoader()
    });
  }



  sendSMS() {
    this.showLoader();
    this._smsHistoriesService.sendTestSMS(this.phoneNo, this.formData.get('message').value).subscribe(result => {
      this.getSMSHistory(this.contactId , this.contactName , this.phoneNo);
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


  showChatListLoader() {
    this.isChatListLoading = true;
  }

  hideChatListLoader() {
    this.isChatListLoading = false;
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
