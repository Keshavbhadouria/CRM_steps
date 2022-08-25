import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LmsChapterTopicComponent } from "./lms-chapter-topic/lms-chapter-topic.component";
import { LmsCourseChapterComponent } from "./lms-course-chapter/lms-course-chapter.component";
import { LmsCoursesComponent } from "./lms-courses/lms-courses.component";
import { LmsTopicTypeComponent } from "./lms-topic-type/lms-topic-type.component";

const routes = [
    { path: "lmsform", loadChildren: () => import('./lmsform/lmsform.module').then(m => m.LMSFormModule) },

    { path: "lmscourses", component: LmsCoursesComponent },
    { path: "coursechapters", component: LmsCourseChapterComponent },
    { path: "topictypes", component: LmsTopicTypeComponent },
    { path: "chaptertopics", component: LmsChapterTopicComponent },
    { path: "chaptertopics/:chapterId", component: LmsChapterTopicComponent } // load topics chapterwise
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class LMSRoutingModule { }
