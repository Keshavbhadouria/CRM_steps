import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-physical-exam-view',
  templateUrl: './physical-exam-view.component.html',
  styleUrls: ['./physical-exam-view.component.scss']
})
export class PhysicalExamViewComponent implements OnInit {

  constructor() { }
  item: any;
  @Input() public modal: any
  @Input() public data: any;
  ngOnInit(): void {
    
    this.item = this.data;
  }
}
