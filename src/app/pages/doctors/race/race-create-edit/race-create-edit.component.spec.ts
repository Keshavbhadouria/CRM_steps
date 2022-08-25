import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceCreateEditComponent } from './race-create-edit.component';

describe('RaceCreateEditComponent', () => {
  let component: RaceCreateEditComponent;
  let fixture: ComponentFixture<RaceCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaceCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
