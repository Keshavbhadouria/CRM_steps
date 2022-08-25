import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { BehaviorSubject, Subject } from 'rxjs';
import { CreateOrEditContactDto } from 'src/app/core/models/Customer/Contact';
import { GetContactObjectionForViewDto } from 'src/app/core/models/Customer/ContactObjection';
import { GetContactTaskForViewDto } from 'src/app/core/models/Customer/ContactTask';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { ContactTaskService } from 'src/app/core/services/contact-task.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-contact-task',
  templateUrl: './contact-task.component.html',
  styleUrls: ['./contact-task.component.scss']
})
export class ContactTaskComponent implements OnInit, OnDestroy {

  public $currentStage = new BehaviorSubject<any>(new GetContactTaskForViewDto());

  // bread crumb items
  loading = false;
  breadCrumbItems: Array<{}>;



  contactId: number;
  filterText = '';
  titleFilter = '';
  descriptionFilter = '';
  maxDueDateFilter: moment.Moment;
  minDueDateFilter: moment.Moment;
  userNameFilter = '';
  roleNameFilter = '';
  contactCompanyFilter = '';
  activityTaskStageStageNameFilter = '';
  activityPriorityPriorityNameFilter = '';
  activityTaskStageId: number;
  activityPriorityId: number;


  activeStageId: number;
  activeStageName: string = '';
  activeStageList: any;


  activeTaskStageIndex: number = 0;
  contactTaskList: GetContactTaskForViewDto[] = [];


  taskStage = [{
    id: 1,
    stageName: 'Backlog'
  },
  {
    id: 2,
    stageName: 'InProgress'

  },
  {
    id: 3,
    stageName: 'Done'
  },
  {
    id: 4,
    stageName: 'Overdue'
  }
  ]

  totalCount: number = 0;
  projectList: any;

  // Create

  active = false;
  saving = false;


  constructor(private _contactTaskService: ContactTaskService, private route: ActivatedRoute,
    private translate: TranslateService,
    private _messageService: MessageService, private modalService: NgbModal) {



  }
  ngOnDestroy(): void {
    this.$currentStage.unsubscribe();
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Contact' }, { label: 'Task', active: true }];
    this.contactId = Number(this.route.snapshot.paramMap.get('contactId'));
    this.getRecords()

    this.$currentStage.subscribe(obj => {
      this.activeStageName = obj.stageName;
      this.activeStageId = obj.id;
      this.activeStageList = this.contactTaskList?.filter(x => x.contactTask.activityTaskStageId == obj.id);
    })
  }

  //#region API Methods

  getRecords() {
    this.showLoader()
    this._contactTaskService.GetAllByFilters(
      this.filterText,
      this.contactId,
      this.titleFilter,
      this.descriptionFilter,
      this.maxDueDateFilter === undefined ? this.maxDueDateFilter : moment(this.maxDueDateFilter).endOf('day'),
      this.minDueDateFilter === undefined ? this.minDueDateFilter : moment(this.minDueDateFilter).startOf('day'),
      this.userNameFilter,
      this.roleNameFilter,
      this.contactCompanyFilter,
      this.activityTaskStageId,
      this.activityPriorityId,
      this.activityTaskStageStageNameFilter,
      this.activityPriorityPriorityNameFilter,
      null,
      0,
      200
    ).then((result) => {
      
      this.contactTaskList = result.result;
      if (this.contactTaskList.length > 0) {
        this.activeTaskStageIndex = 0;
        this.$currentStage.next(this.taskStage[this.activeTaskStageIndex]);
      }

      this.hideLoader()
    },
      (error) => {
        this.hideLoader()
      }
    );
  }

  //#endregion


  //#region Helper Methods

  previousIndex() {
    if (this.activeTaskStageIndex > 0) {
      this.activeTaskStageIndex = this.activeTaskStageIndex - 1;
      this.$currentStage.next(this.taskStage[this.activeTaskStageIndex]);
    }
  }

  nextIndex() {
    
    if ((this.taskStage.length - 1) > this.activeTaskStageIndex) {
      this.activeTaskStageIndex = this.activeTaskStageIndex + 1;
      this.$currentStage.next(this.taskStage[this.activeTaskStageIndex]);
    }
  }

  goToIndex(i) {
    this.activeTaskStageIndex = i;
    this.$currentStage.next(this.taskStage[this.activeTaskStageIndex]);
  }

  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }



  //#endregion


}
