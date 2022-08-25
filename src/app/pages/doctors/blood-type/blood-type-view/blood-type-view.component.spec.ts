import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodTypeViewComponent } from './blood-type-view.component';

describe('BloodTypeViewComponent', () => {
  let component: BloodTypeViewComponent;
  let fixture: ComponentFixture<BloodTypeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodTypeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodTypeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
