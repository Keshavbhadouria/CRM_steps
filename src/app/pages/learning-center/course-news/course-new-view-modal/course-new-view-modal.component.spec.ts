import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseNewViewModalComponent } from './course-new-view-modal.component';

describe('CourseNewViewModalComponent', () => {
  let component: CourseNewViewModalComponent;
  let fixture: ComponentFixture<CourseNewViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseNewViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseNewViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
