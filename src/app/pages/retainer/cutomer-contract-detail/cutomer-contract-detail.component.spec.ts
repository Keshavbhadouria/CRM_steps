import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutomerContractDetailComponent } from './cutomer-contract-detail.component';

describe('CutomerContractDetailComponent', () => {
  let component: CutomerContractDetailComponent;
  let fixture: ComponentFixture<CutomerContractDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CutomerContractDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CutomerContractDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
