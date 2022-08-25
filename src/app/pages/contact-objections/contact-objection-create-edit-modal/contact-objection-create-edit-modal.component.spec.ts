import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactObjectionCreateEditModalComponent } from './contact-objection-create-edit-modal.component';

describe('ContactObjectionCreateEditModalComponent', () => {
  let component: ContactObjectionCreateEditModalComponent;
  let fixture: ComponentFixture<ContactObjectionCreateEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactObjectionCreateEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactObjectionCreateEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
