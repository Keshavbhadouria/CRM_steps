import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeploymentViewComponent } from './deployment-view.component';

describe('DeploymentViewComponent', () => {
  let component: DeploymentViewComponent;
  let fixture: ComponentFixture<DeploymentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeploymentViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeploymentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
