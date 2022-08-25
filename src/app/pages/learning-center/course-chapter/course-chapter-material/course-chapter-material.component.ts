import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dropdown } from 'primeng/dropdown';
import { CreateOrEditLawfirmFeeTypeDto } from 'src/app/core/models/Lawfirm/LawfirmFeeType';
import { CreateOrEditResourceMaterialDto } from 'src/app/core/models/LearningCenter/ResourceMaterial';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { MessageService } from 'src/app/core/services/message.service';
import { ResourceMaterialService } from 'src/app/core/services/resource-material.service';

@Component({
  selector: 'app-course-chapter-material',
  templateUrl: './course-chapter-material.component.html',
  styleUrls: ['./course-chapter-material.component.scss']
})
export class CourseChapterMaterialComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any
  @Output() $modalClose = new EventEmitter();
  @ViewChild('myInputFile') myInputVariable: ElementRef;
  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('targetDate') targetDate: ElementRef;

  // bread crumb items
  loading = false;
  createLoader = false;
  loadingDropdown = false;
  breadCrumbItems: Array<{}>;



  totalCount: number = 0;
  projectList: any;

  allCourseChapterNews: DropdownDto[];

  // Create

  active = false;
  saving = false;

  resourceMaterial: CreateOrEditResourceMaterialDto = new CreateOrEditResourceMaterialDto();

  constructor(private _resourceMaterialService: ResourceMaterialService, private _messageService: MessageService, private modalService: NgbModal) {

    this._resourceMaterialService.getAllCourseChapterNewForTableDropdown().subscribe((result: any) => {

      this.allCourseChapterNews = result.result.items;
    });

   }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'LearningCenter' }, { label: 'Resource Material', active: true }];

    if (this.data) {
      this.resourceMaterial = this.data;
    }
    else {
      this.resourceMaterial = new CreateOrEditResourceMaterialDto();
    }



  }


  //#region API Methods


  save() {
    this.showCreateEditLoader();
    if (this.resourceMaterial) {
      this._resourceMaterialService.createOrEdit(this.resourceMaterial).subscribe((res: any) => {
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



  //#endregion


  //#region Helper Methods


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

  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
  }

  //#endregion


}

