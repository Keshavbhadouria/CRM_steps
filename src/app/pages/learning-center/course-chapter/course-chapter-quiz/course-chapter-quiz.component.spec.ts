import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseChapterQuizComponent } from './course-chapter-quiz.component';

describe('CourseChapterQuizComponent', () => {
  let component: CourseChapterQuizComponent;
  let fixture: ComponentFixture<CourseChapterQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseChapterQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseChapterQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
