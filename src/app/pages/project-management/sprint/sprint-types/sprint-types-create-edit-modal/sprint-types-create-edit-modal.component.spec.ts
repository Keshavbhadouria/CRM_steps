import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintTypesCreateEditModalComponent } from './sprint-types-create-edit-modal.component';

describe('SprintTypesCreateEditModalComponent', () => {
  let component: SprintTypesCreateEditModalComponent;
  let fixture: ComponentFixture<SprintTypesCreateEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintTypesCreateEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintTypesCreateEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
