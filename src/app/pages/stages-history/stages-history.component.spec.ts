import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagesHistoryComponent } from './stages-history.component';

describe('StagesHistoryComponent', () => {
  let component: StagesHistoryComponent;
  let fixture: ComponentFixture<StagesHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StagesHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StagesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
