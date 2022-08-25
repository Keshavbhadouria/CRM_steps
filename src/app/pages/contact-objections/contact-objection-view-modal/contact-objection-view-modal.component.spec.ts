import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactObjectionViewModalComponent } from './contact-objection-view-modal.component';

describe('ContactObjectionViewModalComponent', () => {
  let component: ContactObjectionViewModalComponent;
  let fixture: ComponentFixture<ContactObjectionViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactObjectionViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactObjectionViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
