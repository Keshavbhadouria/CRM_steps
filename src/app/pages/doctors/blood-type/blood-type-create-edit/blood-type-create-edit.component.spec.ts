import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodTypeCreateEditComponent } from './blood-type-create-edit.component';

describe('BloodTypeCreateEditComponent', () => {
  let component: BloodTypeCreateEditComponent;
  let fixture: ComponentFixture<BloodTypeCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodTypeCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodTypeCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
