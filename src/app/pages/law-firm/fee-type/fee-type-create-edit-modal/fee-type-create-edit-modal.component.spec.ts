import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeTypeCreateEditModalComponent } from './fee-type-create-edit-modal.component';

describe('FeeTypeCreateEditModalComponent', () => {
  let component: FeeTypeCreateEditModalComponent;
  let fixture: ComponentFixture<FeeTypeCreateEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeTypeCreateEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeTypeCreateEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
