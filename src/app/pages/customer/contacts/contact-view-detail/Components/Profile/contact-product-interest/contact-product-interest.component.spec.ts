import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactProductInterestComponent } from './contact-product-interest.component';

describe('ContactProductInterestComponent', () => {
  let component: ContactProductInterestComponent;
  let fixture: ComponentFixture<ContactProductInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactProductInterestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactProductInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
