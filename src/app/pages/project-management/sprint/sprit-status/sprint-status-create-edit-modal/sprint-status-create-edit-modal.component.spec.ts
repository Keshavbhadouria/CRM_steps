import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintStatusCreateEditModalComponent } from './sprint-status-create-edit-modal.component';

describe('SprintStatusCreateEditModalComponent', () => {
  let component: SprintStatusCreateEditModalComponent;
  let fixture: ComponentFixture<SprintStatusCreateEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintStatusCreateEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintStatusCreateEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
