import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorsCreateOrEditModalComponent } from './collaborators-create-or-edit-modal.component';

describe('CollaboratorsCreateOrEditModalComponent', () => {
  let component: CollaboratorsCreateOrEditModalComponent;
  let fixture: ComponentFixture<CollaboratorsCreateOrEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaboratorsCreateOrEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorsCreateOrEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
