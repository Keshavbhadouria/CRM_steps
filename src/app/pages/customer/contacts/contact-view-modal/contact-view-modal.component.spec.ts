import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactViewModalComponent } from './contact-view-modal.component';

describe('ContactViewModalComponent', () => {
  let component: ContactViewModalComponent;
  let fixture: ComponentFixture<ContactViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
