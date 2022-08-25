import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintTypesViewModalComponent } from './sprint-types-view-modal.component';

describe('SprintTypesViewModalComponent', () => {
  let component: SprintTypesViewModalComponent;
  let fixture: ComponentFixture<SprintTypesViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintTypesViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintTypesViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
