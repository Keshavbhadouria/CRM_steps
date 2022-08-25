import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactEmailCreateEditModalComponent } from './contact-email-create-edit-modal.component';

describe('ContactEmailCreateEditModalComponent', () => {
  let component: ContactEmailCreateEditModalComponent;
  let fixture: ComponentFixture<ContactEmailCreateEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactEmailCreateEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactEmailCreateEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
