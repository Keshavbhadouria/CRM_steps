import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactQuestionsViewModalComponent } from './contact-questions-view-modal.component';

describe('ContactQuestionsViewModalComponent', () => {
  let component: ContactQuestionsViewModalComponent;
  let fixture: ComponentFixture<ContactQuestionsViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactQuestionsViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactQuestionsViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
