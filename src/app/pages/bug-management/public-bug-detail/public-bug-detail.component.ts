import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BugsService } from 'src/app/core/services/bugs.service';

@Component({
  selector: 'app-public-bug-detail',
  templateUrl: './public-bug-detail.component.html',
  styleUrls: ['./public-bug-detail.component.scss']
})
export class PublicBugDetailComponent implements OnInit {
  sprintPublicId: string;
  bugPublicId: string;
  isEnabled = false;
  viewBug: any;

  constructor(private route: ActivatedRoute,
    private _bugService: BugsService
    ) { }

  ngOnInit(): void {
    this.bugPublicId = this.route.snapshot.paramMap.get('bugPublicId');
    this._bugService.getTaskBugForEditByPublicId(this.bugPublicId).then(res => {
      this.viewBug = res.result;
      this.isEnabled = true;
    });
  }
}
