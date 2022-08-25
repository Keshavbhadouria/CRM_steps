import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditBillingModalComponent } from './create-or-edit-billing-modal.component';

describe('CreateOrEditBillingModalComponent', () => {
  let component: CreateOrEditBillingModalComponent;
  let fixture: ComponentFixture<CreateOrEditBillingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrEditBillingModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditBillingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
