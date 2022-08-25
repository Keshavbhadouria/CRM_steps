import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeploymentApprovalCreateEditComponent } from './deployment-approval-create-edit.component';

describe('DeploymentApprovalCreateEditComponent', () => {
  let component: DeploymentApprovalCreateEditComponent;
  let fixture: ComponentFixture<DeploymentApprovalCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeploymentApprovalCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeploymentApprovalCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
