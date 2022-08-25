import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDescriptionCreateEditComponent } from './job-description-create-edit.component';

describe('JobDescriptionCreateEditComponent', () => {
  let component: JobDescriptionCreateEditComponent;
  let fixture: ComponentFixture<JobDescriptionCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobDescriptionCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDescriptionCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
