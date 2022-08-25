import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractTemplateDetailsCreateEditModalComponent } from './contract-template-details-create-edit-modal.component';

describe('ContractTemplateDetailsCreateEditModalComponent', () => {
  let component: ContractTemplateDetailsCreateEditModalComponent;
  let fixture: ComponentFixture<ContractTemplateDetailsCreateEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractTemplateDetailsCreateEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractTemplateDetailsCreateEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
