import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeploymentCreateEditComponent } from './deployment-create-edit.component';

describe('DeploymentCreateEditComponent', () => {
  let component: DeploymentCreateEditComponent;
  let fixture: ComponentFixture<DeploymentCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeploymentCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeploymentCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
