import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupationsCreateEditComponent } from './occupations-create-edit.component';

describe('OccupationsCreateEditComponent', () => {
  let component: OccupationsCreateEditComponent;
  let fixture: ComponentFixture<OccupationsCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OccupationsCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupationsCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
