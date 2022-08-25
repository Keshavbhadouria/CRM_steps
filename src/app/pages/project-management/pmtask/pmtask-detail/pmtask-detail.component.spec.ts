import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmtaskDetailComponent } from './pmtask-detail.component';

describe('PmtaskDetailComponent', () => {
  let component: PmtaskDetailComponent;
  let fixture: ComponentFixture<PmtaskDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmtaskDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmtaskDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
