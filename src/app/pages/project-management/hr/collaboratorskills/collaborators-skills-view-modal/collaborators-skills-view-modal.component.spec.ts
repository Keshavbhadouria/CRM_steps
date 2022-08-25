import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorsSkillsViewModalComponent } from './collaborators-skills-view-modal.component';

describe('CollaboratorsSkillsViewModalComponent', () => {
  let component: CollaboratorsSkillsViewModalComponent;
  let fixture: ComponentFixture<CollaboratorsSkillsViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaboratorsSkillsViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorsSkillsViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
