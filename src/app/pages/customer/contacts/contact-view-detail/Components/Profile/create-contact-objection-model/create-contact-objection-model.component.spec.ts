import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContactObjectionModelComponent } from './create-contact-objection-model.component';

describe('CreateContactObjectionModelComponent', () => {
  let component: CreateContactObjectionModelComponent;
  let fixture: ComponentFixture<CreateContactObjectionModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateContactObjectionModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContactObjectionModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
