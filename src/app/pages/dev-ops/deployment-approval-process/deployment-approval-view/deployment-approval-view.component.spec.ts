import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeploymentApprovalViewComponent } from './deployment-approval-view.component';

describe('DeploymentApprovalViewComponent', () => {
  let component: DeploymentApprovalViewComponent;
  let fixture: ComponentFixture<DeploymentApprovalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeploymentApprovalViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeploymentApprovalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
