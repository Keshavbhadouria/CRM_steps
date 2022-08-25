import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetainerViewModalComponent } from './retainer-view-modal.component';

describe('RetainerViewModalComponent', () => {
  let component: RetainerViewModalComponent;
  let fixture: ComponentFixture<RetainerViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetainerViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetainerViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
