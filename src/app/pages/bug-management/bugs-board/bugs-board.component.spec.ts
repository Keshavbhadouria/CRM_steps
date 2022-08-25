import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugsBoardComponent } from './bugs-board.component';

describe('BugsBoardComponent', () => {
  let component: BugsBoardComponent;
  let fixture: ComponentFixture<BugsBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugsBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugsBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
