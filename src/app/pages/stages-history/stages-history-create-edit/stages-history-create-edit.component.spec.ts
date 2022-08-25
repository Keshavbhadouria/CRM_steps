import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagesHistoryCreateEditComponent } from './stages-history-create-edit.component';

describe('StagesHistoryCreateEditComponent', () => {
  let component: StagesHistoryCreateEditComponent;
  let fixture: ComponentFixture<StagesHistoryCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StagesHistoryCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StagesHistoryCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
