import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PMTaskBoardComponent } from './pmtask-board.component';

describe('PMTaskBoardComponent', () => {
  let component: PMTaskBoardComponent;
  let fixture: ComponentFixture<PMTaskBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PMTaskBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PMTaskBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
