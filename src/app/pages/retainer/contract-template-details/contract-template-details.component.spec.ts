import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractTemplateDetailsComponent } from './contract-template-details.component';

describe('ContractTemplateDetailsComponent', () => {
  let component: ContractTemplateDetailsComponent;
  let fixture: ComponentFixture<ContractTemplateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractTemplateDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractTemplateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
