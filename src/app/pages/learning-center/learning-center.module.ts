import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningCenterRoutingModule } from './learning-center-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { ResourceMaterialCreateEditModalComponent } from './resource-material/resource-material-create-edit-modal/resource-material-create-edit-modal.component';
import { ResourceMaterialViewModalComponent } from './resource-material/resource-material-view-modal/resource-material-view-modal.component';
import { ResourceMaterialComponent } from './resource-material/resource-material.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseNewsComponent } from './course-news/course-news.component';
import { CourseCertificateComponent } from './Lookup Components/course-certificate/course-certificate.component';
import { CourseCategoryComponent } from './Lookup Components/course-category/course-category.component';
import { CourseNewViewModalComponent } from './course-news/course-new-view-modal/course-new-view-modal.component';
import { CourseChapterComponent } from './course-chapter/course-chapter.component';
import { CourseChapterMaterialComponent } from './course-chapter/course-chapter-material/course-chapter-material.component';
import { CourseChapterAssignmentsComponent } from './course-chapter/course-chapter-assignments/course-chapter-assignments.component';
import { CourseChapterContentComponent } from './course-chapter/course-chapter-content/course-chapter-content.component';
import { CourseChapterQuizComponent } from './course-chapter/course-chapter-quiz/course-chapter-quiz.component';
import { AssignmentTypeComponent } from './Lookup Components/assignment-type/assignment-type.component';


@NgModule({
  declarations: [
    ResourceMaterialComponent,
    ResourceMaterialCreateEditModalComponent,
    ResourceMaterialViewModalComponent,
    CourseNewsComponent,
    CourseCertificateComponent,
    CourseCategoryComponent,
    CourseNewViewModalComponent,
    CourseChapterComponent,
    CourseChapterMaterialComponent,
    CourseChapterAssignmentsComponent,
    CourseChapterContentComponent,
    CourseChapterQuizComponent,
    AssignmentTypeComponent,
  ],
  imports: [
    CommonModule,
    LearningCenterRoutingModule,
    UIModule,
    NgbDropdownModule,
    TranslateModule,
    FormsModule,
    NgbDatepickerModule,
    SharedModule
  ]
})
export class LearningCenterModule { }
