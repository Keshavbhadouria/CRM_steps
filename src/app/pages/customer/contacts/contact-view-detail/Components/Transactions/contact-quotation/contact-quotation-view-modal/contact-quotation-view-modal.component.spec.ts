import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactQuotationViewModalComponent } from './contact-quotation-view-modal.component';

describe('ContactQuotationViewModalComponent', () => {
  let component: ContactQuotationViewModalComponent;
  let fixture: ComponentFixture<ContactQuotationViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactQuotationViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactQuotationViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
