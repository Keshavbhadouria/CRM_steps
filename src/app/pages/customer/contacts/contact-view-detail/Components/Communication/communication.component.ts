import { Component, Injector, OnInit } from '@angular/core';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.scss']
})
export class CommunicationComponent implements OnInit {

  tabMenu: any = [
    { activeIndex: 0, title: 'Preference', icon: '../../../../../../../assets/CRMSteps/Profile/icon12.svg', isActive: true },
    { activeIndex: 1, title: 'SMS', icon: '../../../../../../../assets/CRMSteps/Profile/icon13.svg', isActive: false },
    { activeIndex: 2, title: 'Call', icon: '../../../../../../../assets/CRMSteps/Profile/icon14.svg', isActive: false },
    { activeIndex: 3, title: 'Email', icon: '../../../../../../../assets/CRMSteps/Profile/icon15.svg', isActive: false },
    { activeIndex: 4, title: 'Chat', icon: '../../../../../../../assets/CRMSteps/Profile/icon16.svg', isActive: false },
    { activeIndex: 5, title: 'Zoom', icon: '../../../../../../../assets/CRMSteps/Profile/icon17.svg', isActive: false },
    { activeIndex: 6, title: 'Questions', icon: '../../../../../../../assets/CRMSteps/Profile/iconQuestion.svg', isActive: false },
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
