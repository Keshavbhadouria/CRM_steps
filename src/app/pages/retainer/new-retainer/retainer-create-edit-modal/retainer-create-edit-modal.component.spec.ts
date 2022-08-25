import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetainerCreateEditModalComponent } from './retainer-create-edit-modal.component';

describe('RetainerCreateEditModalComponent', () => {
  let component: RetainerCreateEditModalComponent;
  let fixture: ComponentFixture<RetainerCreateEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetainerCreateEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetainerCreateEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
