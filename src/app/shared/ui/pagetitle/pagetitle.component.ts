import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-page-title',
  templateUrl: './pagetitle.component.html',
  styleUrls: ['./pagetitle.component.scss']
})
export class PagetitleComponent implements OnInit {

  @Input() icon;
  @Input() breadcrumbItems;
  @Input() title: string;
  translate : TranslateService
  constructor(private _translate : TranslateService) { 
    this.translate = _translate;
  }

  ngOnInit() {
  }

}
