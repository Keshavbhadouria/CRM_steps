import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactReviewViewModalComponent } from './contact-review-view-modal.component';

describe('ContactReviewViewModalComponent', () => {
  let component: ContactReviewViewModalComponent;
  let fixture: ComponentFixture<ContactReviewViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactReviewViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactReviewViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
