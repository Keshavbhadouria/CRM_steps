import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactObjectionsComponent } from './contact-objections.component';

describe('ContactObjectionsComponent', () => {
  let component: ContactObjectionsComponent;
  let fixture: ComponentFixture<ContactObjectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactObjectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactObjectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
