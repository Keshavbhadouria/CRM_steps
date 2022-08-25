import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMembersModalComponent } from './team-members-modal.component';

describe('TeamMembersModalComponent', () => {
  let component: TeamMembersModalComponent;
  let fixture: ComponentFixture<TeamMembersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamMembersModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMembersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
