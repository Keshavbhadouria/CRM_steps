import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactRevieewComponent } from './contact-revieew.component';

describe('ContactRevieewComponent', () => {
  let component: ContactRevieewComponent;
  let fixture: ComponentFixture<ContactRevieewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactRevieewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactRevieewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
