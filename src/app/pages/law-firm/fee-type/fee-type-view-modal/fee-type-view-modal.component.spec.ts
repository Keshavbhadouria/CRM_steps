import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeTypeViewModalComponent } from './fee-type-view-modal.component';

describe('FeeTypeViewModalComponent', () => {
  let component: FeeTypeViewModalComponent;
  let fixture: ComponentFixture<FeeTypeViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeTypeViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeTypeViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
