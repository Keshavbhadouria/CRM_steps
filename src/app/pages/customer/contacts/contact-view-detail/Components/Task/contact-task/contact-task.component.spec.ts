import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactTaskComponent } from './contact-task.component';

describe('ContactTaskComponent', () => {
  let component: ContactTaskComponent;
  let fixture: ComponentFixture<ContactTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
