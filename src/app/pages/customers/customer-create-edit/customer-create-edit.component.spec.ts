import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCreateEditComponent } from './customer-create-edit.component';

describe('CustomerCreateEditComponent', () => {
  let component: CustomerCreateEditComponent;
  let fixture: ComponentFixture<CustomerCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
