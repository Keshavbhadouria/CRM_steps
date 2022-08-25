import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseChapterMaterialComponent } from './course-chapter-material.component';

describe('CourseChapterMaterialComponent', () => {
  let component: CourseChapterMaterialComponent;
  let fixture: ComponentFixture<CourseChapterMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseChapterMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseChapterMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
