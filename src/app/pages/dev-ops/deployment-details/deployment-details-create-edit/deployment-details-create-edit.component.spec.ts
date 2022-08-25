import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeploymentDetailsCreateEditComponent } from './deployment-details-create-edit.component';

describe('DeploymentDetailsCreateEditComponent', () => {
  let component: DeploymentDetailsCreateEditComponent;
  let fixture: ComponentFixture<DeploymentDetailsCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeploymentDetailsCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeploymentDetailsCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
