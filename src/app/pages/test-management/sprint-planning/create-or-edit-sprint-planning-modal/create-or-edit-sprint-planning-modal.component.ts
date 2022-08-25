import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownDto } from 'src/app/core/models/Project/CreateOrEditPMProject';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateOrEditStoryEstimationVoteDto, TestSprintPlanningService } from 'src/app/core/services/test-sprint-planning.service';

@Component({
  selector: 'app-create-or-edit-sprint-planning-modal',
  templateUrl: './create-or-edit-sprint-planning-modal.component.html'
  //styleUrls: ['./create-or-edit-sprint-planning-modal.component.scss']
})
export class CreateOrEditSprintPlanningModalComponent implements OnInit {

  @Input() public modal: any
  @Input() public data: any;
  @Output() $modalClose = new EventEmitter();
  storyEstimationVote: CreateOrEditStoryEstimationVoteDto;
  loading = false;
  createLoader = false;

  storyTitles: DropdownDto[];
  users: DropdownDto[];
  storyEstimations: DropdownDto[];
  sprints: DropdownDto[];
  
  constructor(private _testSprintPlanningService: TestSprintPlanningService,
    private _messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.data) {
      this.storyEstimationVote = this.data;
    }
    else {
      this.storyEstimationVote = new CreateOrEditStoryEstimationVoteDto();
    }
    this.loadDropDown();
  }
  loadDropDown() {
    this.showLoader();
    const promises = [
      this._testSprintPlanningService.getAllPMStoryForTableDropdown(),
      this._testSprintPlanningService.getAllUserForTableDropdown(),
      this._testSprintPlanningService.getAllPMStoryEstimationForTableDropdown(),
      this._testSprintPlanningService.getAllPMSprintForTableDropdown(),
    ];
    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.storyTitles = data[0].result;
          this.users = data[1].result;
          this.storyEstimations = data[2].result;
          this.sprints = data[3].result;
        }
        this.hideLoader();
      });
  }
  save(): void {
    this.showCreateEditLoader();
    if (this.storyEstimationVote) {
      this._testSprintPlanningService.createOrEdit(this.storyEstimationVote).then(res => {
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
  closeCreateModal(reason?: any) {
    if (reason) {
      this.modalService.dismissAll(reason);
    } else {
      this.modalService.dismissAll();
    }
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
}
