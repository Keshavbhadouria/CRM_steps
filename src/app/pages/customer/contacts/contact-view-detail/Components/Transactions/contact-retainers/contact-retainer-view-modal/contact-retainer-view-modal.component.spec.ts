import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactRetainerViewModalComponent } from './contact-retainer-view-modal.component';

describe('ContactRetainerViewModalComponent', () => {
  let component: ContactRetainerViewModalComponent;
  let fixture: ComponentFixture<ContactRetainerViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactRetainerViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactRetainerViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
