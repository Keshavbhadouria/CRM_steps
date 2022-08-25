import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactRetainersComponent } from './contact-retainers.component';

describe('ContactRetainersComponent', () => {
  let component: ContactRetainersComponent;
  let fixture: ComponentFixture<ContactRetainersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactRetainersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactRetainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
