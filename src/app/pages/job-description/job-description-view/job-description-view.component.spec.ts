import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDescriptionViewComponent } from './job-description-view.component';

describe('JobDescriptionViewComponent', () => {
  let component: JobDescriptionViewComponent;
  let fixture: ComponentFixture<JobDescriptionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobDescriptionViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDescriptionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
