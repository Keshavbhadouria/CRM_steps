import { Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { QuestionDto, QuestionOption } from 'src/app/core/services/lmsform.service';
import { FormCreateComponent } from './../form-create.component'
import { QuestionOptionComponent } from './question-option/question-option.component';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @ViewChild("viewContainerRef", { read: ViewContainerRef }) VCR: ViewContainerRef;
  componentsReferences = Array<ComponentRef<QuestionOptionComponent>>();
  
 public question : QuestionDto = new QuestionDto();
 public parentRef: FormCreateComponent;
 questionTypes = [
    {id: 'radio', displayName: 'Radio'},
    {id: 'checkbox', displayName: 'Check'},
    {id: 'text', displayName: 'Text'},
    {id: 'dropdown', displayName: 'Dropdown'}
 ]
  constructor(private CFR: ComponentFactoryResolver) { }

  ngOnInit(): void {

  }
  AddOption(){
    let componentFactory = this.CFR.resolveComponentFactory(QuestionOptionComponent);

    let childComponentRef = this.VCR.createComponent(componentFactory);

    let childComponent = childComponentRef.instance;
    childComponent.questionOption = new QuestionOption();
    childComponent.parentRef = this;
    console.log(childComponent.questionOption);
    this.question.QuestionOptions.push(childComponent.questionOption);
    // add reference for newly created component
    this.componentsReferences.push(childComponentRef);
  }

}
