import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationCreateEditComponent } from './application-create-edit.component';

describe('ApplicationCreateEditComponent', () => {
  let component: ApplicationCreateEditComponent;
  let fixture: ComponentFixture<ApplicationCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
