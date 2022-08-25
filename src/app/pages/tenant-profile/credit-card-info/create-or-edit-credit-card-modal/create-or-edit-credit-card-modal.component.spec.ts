import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditCreditCardModalComponent } from './create-or-edit-credit-card-modal.component';

describe('CreateOrEditCreditCardModalComponent', () => {
  let component: CreateOrEditCreditCardModalComponent;
  let fixture: ComponentFixture<CreateOrEditCreditCardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrEditCreditCardModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditCreditCardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
