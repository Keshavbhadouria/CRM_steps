import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CreatetLMSForm, LmsformService, QuestionDto } from 'src/app/core/services/lmsform.service';
import { QuestionComponent } from './question/question.component';

@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.scss']
})
export class FormCreateComponent implements OnInit {
  @ViewChild("viewContainerRef", { read: ViewContainerRef }) VCR: ViewContainerRef;
  componentsReferences = Array<ComponentRef<QuestionComponent>>();

  allDisplayTypes: any;
  allFormsType: any;
  breadCrumbItems: Array<{}>;
  createForm = new CreatetLMSForm();
  
  constructor(private _formService: LmsformService, private CFR: ComponentFactoryResolver) { }

  loading = false;
  createLoader = false;
  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'LMS' }, { label: 'CreateForm', active: true }];
    this.loadDropdown();
  }

  loadDropdown(){
    this.showLoader();
    const promises = [
      this._formService.getAllLMSDisplayTypeForTableDropdown(),
      this._formService.getAllLMSFormTypeForTableDropdown()
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.allDisplayTypes = data[0].result;
          this.allFormsType = data[1].result;
        }
        this.hideLoader();
      });
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

  addQuestion() {
    let componentFactory = this.CFR.resolveComponentFactory(QuestionComponent);

    let childComponentRef = this.VCR.createComponent(componentFactory);

    let childComponent = childComponentRef.instance;
    childComponent.question = new QuestionDto();
    childComponent.parentRef = this;
    console.log(childComponent.question);
    // add reference for newly created component
    this.componentsReferences.push(childComponentRef);
  }
}
