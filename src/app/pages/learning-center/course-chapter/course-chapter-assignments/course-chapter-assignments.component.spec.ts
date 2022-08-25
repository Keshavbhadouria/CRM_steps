import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseChapterAssignmentsComponent } from './course-chapter-assignments.component';

describe('CourseChapterAssignmentsComponent', () => {
  let component: CourseChapterAssignmentsComponent;
  let fixture: ComponentFixture<CourseChapterAssignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseChapterAssignmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseChapterAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
