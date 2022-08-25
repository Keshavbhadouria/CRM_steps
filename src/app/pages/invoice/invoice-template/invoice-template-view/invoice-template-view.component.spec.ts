import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceTemplateViewComponent } from './invoice-template-view.component';

describe('InvoiceTemplateViewComponent', () => {
  let component: InvoiceTemplateViewComponent;
  let fixture: ComponentFixture<InvoiceTemplateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceTemplateViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceTemplateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
