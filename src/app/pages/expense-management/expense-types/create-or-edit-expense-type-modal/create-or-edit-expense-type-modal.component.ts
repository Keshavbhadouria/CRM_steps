import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateOrEditServiceExpenseTypeDto, ExpenseTypeService } from 'src/app/core/services/expense-type.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-or-edit-expense-type-modal',
  templateUrl: './create-or-edit-expense-type-modal.component.html'
  //styleUrls: ['./create-or-edit-expense-type-modal.component.scss']
})
export class CreateOrEditExpenseTypeModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  expenseType: CreateOrEditServiceExpenseTypeDto;
  loading = false;
  createLoader = false;

  constructor(private _expenseTypeService: ExpenseTypeService,
    private _messageService: MessageService) { }

  ngOnInit(): void {
    if (this.data) {
      this.expenseType = this.data;
    }
    else {
      this.expenseType = new CreateOrEditServiceExpenseTypeDto();
    }
  }
  save() {
    this.showCreateEditLoader();
    if (this.expenseType) {
      this._expenseTypeService.createOrEdit(this.expenseType).then(res => {
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

  showCreateEditLoader() {
    this.createLoader = true;
  }

  hideCreateEditLoader() {
    this.createLoader = false;
  }

  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }
}
