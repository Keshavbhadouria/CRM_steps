import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStatusCreateEditModalComponent } from './project-status-create-edit-modal.component';

describe('ProjectStatusCreateEditModalComponent', () => {
  let component: ProjectStatusCreateEditModalComponent;
  let fixture: ComponentFixture<ProjectStatusCreateEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectStatusCreateEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStatusCreateEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
