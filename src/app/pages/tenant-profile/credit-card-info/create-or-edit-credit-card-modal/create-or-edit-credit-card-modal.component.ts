import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { CreateOrEditUserCreditCardDto, CreditCardService } from 'src/app/core/services/credit-card.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-or-edit-credit-card-modal',
  templateUrl: './create-or-edit-credit-card-modal.component.html',
  styleUrls: ['./create-or-edit-credit-card-modal.component.scss']
})
export class CreateOrEditCreditCardModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  cardIcons = [
    { id: 'Amrican Express', displayName: 'fab fa-cc-amex' },
    { id: 'Diners Club', displayName: 'fab fa-diners-club' },
    { id: 'JCB', displayName: 'fab fa-cc-jcb' },
    { id: 'Discover', displayName: 'fab fa-cc-discover' },
    { id: 'Visa', displayName: 'fab fa-cc-visa' },
    { id: 'Mastercard', displayName: 'fab fa-cc-mastercard' }
  ];

  creditCard : CreateOrEditUserCreditCardDto = new CreateOrEditUserCreditCardDto();
  userModel: any;
  allContact: any;
  allStages: any;
  allStages2: any;
  allContacts: any;
  createLoader: boolean;
  loading: boolean;

  constructor(private _ccService: CreditCardService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.creditCard = this.data.userCreditCard;
    }
    else {
      this.creditCard = new CreateOrEditUserCreditCardDto();
    }
    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      // this._ccService.getAllContactForTableDropdown(),
      // this._ccService.getAllLeadStageForTableDropdown(),
      // this._ccService.getAllLeadStageForTableDropdown(),
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          // this.allContacts = data[0].result;
          // this.allStages = data[1].result;
          // this.allStages2 = data[2].result;
        }
        this.hideLoader();
      });
  }

  save(): void {
    this.showCreateEditLoader();
    if (this.creditCard) {
      this._ccService.createOrEdit(this.creditCard).then(res => {
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


  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
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

  hideLoader(): void {
    this.loading = false;
  }
}
