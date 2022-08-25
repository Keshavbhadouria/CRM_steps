import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStatusViewModalComponent } from './project-status-view-modal.component';

describe('ProjectStatusViewModalComponent', () => {
  let component: ProjectStatusViewModalComponent;
  let fixture: ComponentFixture<ProjectStatusViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectStatusViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStatusViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
