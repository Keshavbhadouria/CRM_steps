import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class ContactTransactionsComponent implements OnInit {

  tabMenu: any = [
    { activeIndex: 0, title: 'Retainer', icon: '../../../../../../../assets/CRMSteps/MenuIcons/retainers.png', isActive: true },
    { activeIndex: 1, title: 'Quotation', icon: '../../../../../../../assets/CRMSteps/MenuIcons/Quotation.png', isActive: false },
    { activeIndex: 2, title: 'Invoice', icon: '../../../../../../../assets/CRMSteps/MenuIcons/invoice.png', isActive: false },
    { activeIndex: 3, title: 'PaymentPlan', icon: '../../../../../../../assets/CRMSteps/MenuIcons/payment-plans.png', isActive: false },
    { activeIndex: 4, title: 'History', icon: '../../../../../../../assets/CRMSteps/MenuIcons/payment-histories.png', isActive: false },
  ]

  activeIndex: number = 0;

  constructor() {

  }

  ngOnInit(): void {
  }

  onSelectTabMenu(item) {
    this.tabMenu.forEach(element => {
      element.isActive = false;
    });
    item.isActive = true;
    this.activeIndex = item.activeIndex;
  }

}
