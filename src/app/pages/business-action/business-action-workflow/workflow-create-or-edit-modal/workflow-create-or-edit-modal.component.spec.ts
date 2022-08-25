import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowCreateOrEditModalComponent } from './workflow-create-or-edit-modal.component';

describe('WorkflowCreateOrEditModalComponent', () => {
  let component: WorkflowCreateOrEditModalComponent;
  let fixture: ComponentFixture<WorkflowCreateOrEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowCreateOrEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowCreateOrEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
