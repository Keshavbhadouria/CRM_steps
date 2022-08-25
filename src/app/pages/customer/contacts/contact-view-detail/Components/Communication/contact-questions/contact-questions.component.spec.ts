import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactQuestionsComponent } from './contact-questions.component';

describe('ContactQuestionsComponent', () => {
  let component: ContactQuestionsComponent;
  let fixture: ComponentFixture<ContactQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
