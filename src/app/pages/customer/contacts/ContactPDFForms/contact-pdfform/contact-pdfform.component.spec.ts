import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPDFFormComponent } from './contact-pdfform.component';

describe('ContactPDFFormComponent', () => {
  let component: ContactPDFFormComponent;
  let fixture: ComponentFixture<ContactPDFFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactPDFFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPDFFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
