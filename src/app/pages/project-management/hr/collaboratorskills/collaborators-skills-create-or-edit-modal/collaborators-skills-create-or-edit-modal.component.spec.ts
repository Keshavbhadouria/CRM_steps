import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorsSkillsCreateOrEditModalComponent } from './collaborators-skills-create-or-edit-modal.component';

describe('CollaboratorsSkillsCreateOrEditModalComponent', () => {
  let component: CollaboratorsSkillsCreateOrEditModalComponent;
  let fixture: ComponentFixture<CollaboratorsSkillsCreateOrEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaboratorsSkillsCreateOrEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorsSkillsCreateOrEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
