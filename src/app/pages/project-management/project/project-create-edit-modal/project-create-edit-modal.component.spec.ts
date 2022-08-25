import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCreateEditModalComponent } from './project-create-edit-modal.component';

describe('ProjectCreateEditModalComponent', () => {
  let component: ProjectCreateEditModalComponent;
  let fixture: ComponentFixture<ProjectCreateEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCreateEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCreateEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
