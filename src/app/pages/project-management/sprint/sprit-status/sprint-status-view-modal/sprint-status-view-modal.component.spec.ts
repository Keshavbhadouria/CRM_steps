import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintStatusViewModalComponent } from './sprint-status-view-modal.component';

describe('SprintStatusViewModalComponent', () => {
  let component: SprintStatusViewModalComponent;
  let fixture: ComponentFixture<SprintStatusViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintStatusViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintStatusViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
