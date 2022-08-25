import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowViewModalComponent } from './workflow-view-modal.component';

describe('WorkflowViewModalComponent', () => {
  let component: WorkflowViewModalComponent;
  let fixture: ComponentFixture<WorkflowViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
