import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeploymentDetailsViewComponent } from './deployment-details-view.component';

describe('DeploymentDetailsViewComponent', () => {
  let component: DeploymentDetailsViewComponent;
  let fixture: ComponentFixture<DeploymentDetailsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeploymentDetailsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeploymentDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
