import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawfirmServiceTeamMemberComponent } from './lawfirm-service-team-member.component';

describe('LawfirmServiceTeamMemberComponent', () => {
  let component: LawfirmServiceTeamMemberComponent;
  let fixture: ComponentFixture<LawfirmServiceTeamMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawfirmServiceTeamMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawfirmServiceTeamMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
