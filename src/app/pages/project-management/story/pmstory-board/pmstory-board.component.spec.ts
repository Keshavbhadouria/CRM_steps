import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PMStoryBoardComponent } from './pmstory-board.component';

describe('PMStoryBoardComponent', () => {
  let component: PMStoryBoardComponent;
  let fixture: ComponentFixture<PMStoryBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PMStoryBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PMStoryBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
