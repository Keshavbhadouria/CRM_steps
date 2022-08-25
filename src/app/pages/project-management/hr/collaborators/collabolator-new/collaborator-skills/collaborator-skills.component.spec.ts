import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorSkillsComponent } from './collaborator-skills.component';

describe('CollaboratorSkillsComponent', () => {
  let component: CollaboratorSkillsComponent;
  let fixture: ComponentFixture<CollaboratorSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaboratorSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
