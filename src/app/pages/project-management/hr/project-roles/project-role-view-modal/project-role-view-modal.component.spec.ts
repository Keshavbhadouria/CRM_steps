import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRoleViewModalComponent } from './project-role-view-modal.component';

describe('ProjectRoleViewModalComponent', () => {
  let component: ProjectRoleViewModalComponent;
  let fixture: ComponentFixture<ProjectRoleViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectRoleViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectRoleViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
