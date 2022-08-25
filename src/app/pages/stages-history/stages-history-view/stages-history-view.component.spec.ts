import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagesHistoryViewComponent } from './stages-history-view.component';

describe('StagesHistoryViewComponent', () => {
  let component: StagesHistoryViewComponent;
  let fixture: ComponentFixture<StagesHistoryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StagesHistoryViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StagesHistoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
