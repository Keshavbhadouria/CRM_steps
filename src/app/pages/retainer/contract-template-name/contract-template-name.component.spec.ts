import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractTemplateNameComponent } from './contract-template-name.component';

describe('ContractTemplateNameComponent', () => {
  let component: ContractTemplateNameComponent;
  let fixture: ComponentFixture<ContractTemplateNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractTemplateNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractTemplateNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
