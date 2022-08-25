import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractTemplateDetailsViewModalComponent } from './contract-template-details-view-modal.component';

describe('ContractTemplateDetailsViewModalComponent', () => {
  let component: ContractTemplateDetailsViewModalComponent;
  let fixture: ComponentFixture<ContractTemplateDetailsViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractTemplateDetailsViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractTemplateDetailsViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
