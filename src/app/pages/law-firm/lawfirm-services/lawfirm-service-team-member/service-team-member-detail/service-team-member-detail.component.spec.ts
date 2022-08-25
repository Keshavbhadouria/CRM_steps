import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTeamMemberDetailComponent } from './service-team-member-detail.component';

describe('ServiceTeamMemberDetailComponent', () => {
  let component: ServiceTeamMemberDetailComponent;
  let fixture: ComponentFixture<ServiceTeamMemberDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceTeamMemberDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceTeamMemberDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
