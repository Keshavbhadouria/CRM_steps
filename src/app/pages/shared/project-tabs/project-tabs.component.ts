import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { SprintService } from 'src/app/core/services/sprint.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-project-tabs',
  templateUrl: './project-tabs.component.html',
  styleUrls: ['./project-tabs.component.scss']
})
export class ProjectTabsComponent implements OnInit {
  @Input() public tabName: any
  @Input() public sprintId: any
  @Input() public projectId: any
  public activeTab: string;
  projects: any[];
  sprints: any[];
  displayRoleName: any;

  constructor(
    private _projectService: ProjectService,
    private _sprintService: SprintService,
    private router: Router,
    private route: ActivatedRoute,
    private _authService: AuthenticationService
  ) {


  }

  ngOnInit(): void {
    this.tabName = "sprints";
    this.activeTab = "sprints"
    this.sprintId = environment.emptyGuid;
    if (this.route.snapshot.paramMap.get('projectId') != null)
      this.projectId = this.route.snapshot.paramMap.get('projectId');
    if (this.route.snapshot.paramMap.get('sprintId') != null)
      this.sprintId = this.route.snapshot.paramMap.get('sprintId');
    if (this.route.snapshot.paramMap.get('tabname') != null)
      this.tabName = this.route.snapshot.paramMap.get('tabname');
    if (this.projectId) {
      this.loadDropDowns();
    }
    this.displayRoleName = this._authService.getUserRoleName().toLowerCase();
  }

  loadDropDowns() {
    const promises = [
      this._projectService.getAllPMProjectForTableGuidDropDown(environment.emptyGuid),
    ];

    if (this.sprintId != environment.emptyGuid)
      promises.push(this._sprintService.getAllPMSprintForTableDropDownGuid(this.projectId));

    Promise.all(promises)
      .then(data => {
        if (data.length > 0) {
          this.projects = data[0].result;

          if (this.sprintId != environment.emptyGuid)
            this.sprints = data[1].result;

        }
      });
  }

  hasSprint(){
    return this.sprintId != environment.emptyGuid
  }

  projectChanged() {
    this.router.navigate(['/projectDetail/' + this.projectId]).then(() => {
      window.location.reload();
    });
  }

  sprintChanged(){
    this.router.navigate(['/projectDetail/' + this.projectId+"/"+this.sprintId+"/"+this.activeTab]).then(() => {
      window.location.reload();
    });
  }
  // sprintChanged() {

  //   var navigateRoute = "";

  //   if (this.tabName == "stories")
  //     navigateRoute = '/pm/story/stories';
  //   else if (this.tabName == "storyboard")
  //     navigateRoute = '/pm/story/storyboard';
  //   else if (this.tabName == "tasks")
  //     navigateRoute = '/pm/pmtasks';
  //   else if (this.tabName == "taskboard")
  //     navigateRoute = '/pm/taskboard';
  //   else if (this.tabName == "bugs")
  //     navigateRoute = '/bugmanagement/taskbugs';
  //   else if (this.tabName == "bugsboard")
  //     navigateRoute = '/bugmanagement/bugsboard';
  //   else if (this.tabName == "storyestimation")
  //     navigateRoute = '/memberStoryEstimation';

  //   this.router.navigate([navigateRoute, this.sprintId])
  //     .then(() => {
  //       window.location.reload();
  //     });
  // }
  changeTab(tab) {
    
      if (tab == 'sprints') {
        this.tabName = 'sprints';
        this.activeTab = 'sprints';
        this.router.navigate(['/projectDetail/' + this.projectId]);
      }else if (tab == 'epics') {
        this.tabName = 'epics';
        this.activeTab = 'epics';
        this.router.navigate(['/projectDetail/' + this.projectId]);
      }
      else{
        this.tabName = tab;
        this.activeTab = tab;
        this.router.navigate(['/projectDetail/' + this.projectId + "/" + this.sprintId + "/" + this.activeTab]);
      }
    
  }

  IsDisabled(){
    return this.sprintId == environment.emptyGuid;
  }
}
