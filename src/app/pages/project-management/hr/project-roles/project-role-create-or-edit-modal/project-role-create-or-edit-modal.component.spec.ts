import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRoleCreateOrEditModalComponent } from './project-role-create-or-edit-modal.component';

describe('ProjectRoleCreateOrEditModalComponent', () => {
  let component: ProjectRoleCreateOrEditModalComponent;
  let fixture: ComponentFixture<ProjectRoleCreateOrEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectRoleCreateOrEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectRoleCreateOrEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
