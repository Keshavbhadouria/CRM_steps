import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  tabMenu: any = [
    { activeIndex: 0, title: 'Basic Profile', icon: '../../../../../../../assets/CRMSteps/Profile/icon12.svg', isActive: true },
    { activeIndex: 1, title: 'Product Interest', icon: '../../../../../../../assets/CRMSteps/Profile/icon13.svg', isActive: false },
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
