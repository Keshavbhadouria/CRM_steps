import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintCreateEditModalComponent } from './sprint-create-edit-modal.component';

describe('SprintCreateEditModalComponent', () => {
  let component: SprintCreateEditModalComponent;
  let fixture: ComponentFixture<SprintCreateEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintCreateEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintCreateEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
