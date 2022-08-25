import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseCategoryComponent } from './Lookup Components/course-category/course-category.component';
import { CourseCertificateComponent } from './Lookup Components/course-certificate/course-certificate.component';
import { CourseChapterComponent } from './course-chapter/course-chapter.component';
import { CourseNewsComponent } from './course-news/course-news.component';
import { ResourceMaterialComponent } from './resource-material/resource-material.component';

const routes: Routes = [
  {
    path: 'resourcemateriallist',
    component:ResourceMaterialComponent
  },
  {
    path: 'coursecertificate',
    component: CourseCertificateComponent
  },
  {
    path: 'coursecategory',
    component: CourseCategoryComponent
  },
  {
    path: 'coursenew',
    component:CourseNewsComponent
  },
  {
    path: 'coursechapter',
    component:CourseChapterComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningCenterRoutingModule { }
