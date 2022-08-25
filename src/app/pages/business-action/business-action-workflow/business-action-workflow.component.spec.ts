import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessActionWorkflowComponent } from './business-action-workflow.component';

describe('BusinessActionWorkflowComponent', () => {
  let component: BusinessActionWorkflowComponent;
  let fixture: ComponentFixture<BusinessActionWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessActionWorkflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessActionWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
