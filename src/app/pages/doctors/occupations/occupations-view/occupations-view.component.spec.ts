import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupationsViewComponent } from './occupations-view.component';

describe('OccupationsViewComponent', () => {
  let component: OccupationsViewComponent;
  let fixture: ComponentFixture<OccupationsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OccupationsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupationsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
