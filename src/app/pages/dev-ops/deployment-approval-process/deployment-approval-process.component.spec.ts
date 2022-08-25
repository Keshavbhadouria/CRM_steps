import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeploymentApprovalProcessComponent } from './deployment-approval-process.component';

describe('DeploymentApprovalProcessComponent', () => {
  let component: DeploymentApprovalProcessComponent;
  let fixture: ComponentFixture<DeploymentApprovalProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeploymentApprovalProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeploymentApprovalProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
