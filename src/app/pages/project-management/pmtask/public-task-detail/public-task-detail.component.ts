import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PMtasksServiceProxy } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-public-task-detail',
  templateUrl: './public-task-detail.component.html',
  styleUrls: ['./public-task-detail.component.scss']
})
export class PublicTaskDetailComponent implements OnInit {
  sprintPublicId: string;
  taskPublicId: string;
  viewTask: any;
  isEnabled = false;

  constructor(private route: ActivatedRoute,
      private _taskService: PMtasksServiceProxy) { }

  ngOnInit(): void {
    this.taskPublicId = this.route.snapshot.paramMap.get('taskPublicId');
    this._taskService.getPMtaskForEditByPublicId(this.taskPublicId).then(res=> {
      this.viewTask = res.result;
      this.isEnabled = true;
    })
  }

}
