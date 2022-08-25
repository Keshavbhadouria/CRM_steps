import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LMSRoutingModule } from './lms-routing-module';
import { LmsCoursesComponent } from './lms-courses/lms-courses.component';
import { CreateOrEditCourseModalComponent } from './lms-courses/create-or-edit-course-modal/create-or-edit-course-modal.component';
import { ViewCourseModalComponent } from './lms-courses/view-course-modal/view-course-modal.component';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { LmsCourseChapterComponent } from './lms-course-chapter/lms-course-chapter.component';
import { CreateOrEditLmsCourseChapterModalComponent } from './lms-course-chapter/create-or-edit-lms-course-chapter-modal/create-or-edit-lms-course-chapter-modal.component';
import { LmsTopicTypeComponent } from './lms-topic-type/lms-topic-type.component';
import { CreateOrEditLmsTopicTypeModalComponent } from './lms-topic-type/create-or-edit-lms-topic-type-modal/create-or-edit-lms-topic-type-modal.component';
import { ViewLmsTopicTypeModalComponent } from './lms-topic-type/view-lms-topic-type-modal/view-lms-topic-type-modal.component';
import { LmsChapterTopicComponent } from './lms-chapter-topic/lms-chapter-topic.component';
import { CreateOrEditLmsChapterTopicModalComponent } from './lms-chapter-topic/create-or-edit-lms-chapter-topic-modal/create-or-edit-lms-chapter-topic-modal.component';
import { ViewChapterTopicModalComponent } from './lms-chapter-topic/view-chapter-topic-modal/view-chapter-topic-modal.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';



@NgModule({
  declarations: [
    LmsCoursesComponent,
    CreateOrEditCourseModalComponent,
    ViewCourseModalComponent,
    LmsCourseChapterComponent,
    CreateOrEditLmsCourseChapterModalComponent,
    LmsTopicTypeComponent,
    CreateOrEditLmsTopicTypeModalComponent,
    ViewLmsTopicTypeModalComponent,
    LmsChapterTopicComponent,
    CreateOrEditLmsChapterTopicModalComponent,
    ViewChapterTopicModalComponent,
  ],
  imports: [
    CommonModule,
    LMSRoutingModule,

    //minimun requirement
    NgbDropdownModule,
    UIModule,
    TranslateModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule,
    AccordionModule
  ]
})
export class LMSModule { }
