import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignObjectivesComponent } from './campaign-objectives.component';

describe('CampaignObjectivesComponent', () => {
  let component: CampaignObjectivesComponent;
  let fixture: ComponentFixture<CampaignObjectivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignObjectivesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignObjectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
