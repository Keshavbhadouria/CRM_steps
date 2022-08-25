import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactQuestionsCreateEditModalComponent } from './contact-questions-create-edit-modal.component';

describe('ContactQuestionsCreateEditModalComponent', () => {
  let component: ContactQuestionsCreateEditModalComponent;
  let fixture: ComponentFixture<ContactQuestionsCreateEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactQuestionsCreateEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactQuestionsCreateEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
