import { Component, OnInit } from '@angular/core';
import { QuestionOption } from 'src/app/core/services/lmsform.service';
import { QuestionComponent } from '../question.component';

@Component({
  selector: 'app-question-option',
  templateUrl: './question-option.component.html',
  styleUrls: ['./question-option.component.scss']
})
export class QuestionOptionComponent implements OnInit {
  public questionOption : QuestionOption = new QuestionOption();
  public parentRef: QuestionComponent;
  constructor() { }

  ngOnInit(): void {
  }

}
