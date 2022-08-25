import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.scss']
})
export class ContactViewComponent implements OnInit {

  tabMenu: any = [
    { activeIndex: 0, title: 'Profile', icon: '../../../../../../assets/CRMSteps/Profile/profile.svg', isActive: true },
    { activeIndex: 1, title: 'Communication', icon: '../../../../../../assets/CRMSteps/Profile/communication.svg', isActive: false },
    { activeIndex: 2, title: 'Transactions', icon: '../../../../../../assets/CRMSteps/Profile/transaction.svg', isActive: false },
    { activeIndex: 3, title: 'Task', icon: '../../../../../../assets/CRMSteps/Profile/task.svg', isActive: false },
    { activeIndex: 4, title: 'Documents', icon: '../../../../../../assets/CRMSteps/Profile/documents.svg', isActive: false },

]

activeIndex: number = 0;

  constructor() { }

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
