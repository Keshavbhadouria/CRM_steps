import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactEmailViewModalComponent } from './contact-email-view-modal.component';

describe('ContactEmailViewModalComponent', () => {
  let component: ContactEmailViewModalComponent;
  let fixture: ComponentFixture<ContactEmailViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactEmailViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactEmailViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
