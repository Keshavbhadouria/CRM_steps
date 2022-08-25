import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseChapterContentComponent } from './course-chapter-content.component';

describe('CourseChapterContentComponent', () => {
  let component: CourseChapterContentComponent;
  let fixture: ComponentFixture<CourseChapterContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseChapterContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseChapterContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
