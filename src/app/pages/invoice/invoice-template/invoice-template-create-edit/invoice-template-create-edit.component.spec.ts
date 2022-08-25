import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceTemplateCreateEditComponent } from './invoice-template-create-edit.component';

describe('InvoiceTemplateCreateEditComponent', () => {
  let component: InvoiceTemplateCreateEditComponent;
  let fixture: ComponentFixture<InvoiceTemplateCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceTemplateCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceTemplateCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
