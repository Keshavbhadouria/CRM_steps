import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmtaskViewComponent } from './pmtask-view.component';

describe('PmtaskViewComponent', () => {
  let component: PmtaskViewComponent;
  let fixture: ComponentFixture<PmtaskViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmtaskViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmtaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
